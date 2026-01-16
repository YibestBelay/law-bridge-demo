import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const search = searchParams.get("search") || "";
    const specializations = searchParams.get("specializations")?.split(",") || [];
    const location = searchParams.get("location") || "";
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const availability = searchParams.get("availability") || "";
    const rating = searchParams.get("rating");
    const experience = searchParams.get("experience")?.split(",") || [];
    const badges = searchParams.get("badges")?.split(",") || [];
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const offset = (page - 1) * limit;

    // First, get all lawyer profile IDs
    const { data: lawyerProfiles } = await supabase
      .from("profiles")
      .select("id")
      .eq("role", "lawyer");

    const lawyerIds = lawyerProfiles?.map((p) => p.id) || [];

    if (lawyerIds.length === 0) {
      return NextResponse.json({
        lawyers: [],
        pagination: { page: 1, limit, total: 0, totalPages: 0 },
      });
    }

    // Start building the query for lawyers
    let query = supabase
      .from("lawyers")
      .select("*")
      .in("id", lawyerIds);

    // Apply filters
    // Note: Search will be handled after fetching profiles
    // For now, we'll filter by location and other lawyer-specific fields

    if (specializations.length > 0) {
      // Filter by specialization array contains
      query = query.contains("specialization", specializations);
    }

    if (location && location !== "All locations") {
      query = query.eq("location", location);
    }

    if (priceMin) {
      query = query.gte("consultation_fee", parseFloat(priceMin));
    }

    if (priceMax) {
      query = query.lte("consultation_fee", parseFloat(priceMax));
    }

    if (availability && availability !== "any") {
      query = query.eq("availability_status", availability);
    }

    if (rating) {
      query = query.gte("rating", parseFloat(rating));
    }

    // Experience filter (handled in application logic)
    // Badges filter (verified, topRated, etc.)
    if (badges.includes("verified")) {
      query = query.eq("verified", true);
    }

    // Get total count for pagination
    const { count } = await supabase
      .from("lawyers")
      .select("*", { count: "exact", head: true });

    // Apply sorting (default: rating descending)
    query = query.order("rating", { ascending: false });

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching lawyers:", error);
      return NextResponse.json(
        { error: "Failed to fetch lawyers" },
        { status: 500 }
      );
    }

    // Fetch profiles for the lawyers
    const lawyerProfileIds = (data || []).map((l: any) => l.id);
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, email, phone")
      .in("id", lawyerProfileIds);

    const profileMap = new Map(
      (profiles || []).map((p: any) => [p.id, p])
    );

    // Apply search filter after fetching profiles
    let filteredData = data || [];
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter((lawyer: any) => {
        const profile = profileMap.get(lawyer.id);
        const nameMatch = profile?.full_name?.toLowerCase().includes(searchLower);
        const locationMatch = lawyer.location?.toLowerCase().includes(searchLower);
        const specializationMatch = lawyer.specialization?.some((spec: string) =>
          spec.toLowerCase().includes(searchLower)
        );
        return nameMatch || locationMatch || specializationMatch;
      });
    }

    // Transform data to match frontend interface
    const lawyers = filteredData.map((lawyer: any) => {
      const profile = profileMap.get(lawyer.id);

      // Calculate badges
      const topRated = (lawyer.rating || 0) >= 4.8;
      const fastResponse =
        lawyer.response_time &&
        parseFloat(lawyer.response_time.replace(/[^0-9.]/g, "")) <= 2;
      const risingStar =
        (lawyer.cases_handled || 0) < 100 && (lawyer.rating || 0) >= 4.5;

      return {
        id: lawyer.id,
        name: profile?.full_name || lawyer.title || "Lawyer",
        photo: lawyer.photo_url || "👨‍💼",
        specialization:
          Array.isArray(lawyer.specialization) && lawyer.specialization.length > 0
            ? lawyer.specialization[0]
            : "General Law",
        location: lawyer.location || "Unknown",
        rating: Number(lawyer.rating) || 0,
        reviews: lawyer.reviews_count || 0,
        experience: lawyer.experience || 0,
        price: Number(lawyer.consultation_fee) || 0,
        available: lawyer.availability_status || "any",
        verified: lawyer.verified || false,
        topRated,
        fastResponse,
        risingStar,
        cases: lawyer.cases_handled || 0,
        responseTime: lawyer.response_time || "N/A",
        successRate: Number(lawyer.success_rate) || 0,
      };
    });

    // Apply experience filter in application logic
    let filteredLawyers = lawyers;
    if (experience.length > 0) {
      filteredLawyers = lawyers.filter((lawyer) => {
        return experience.some((exp) => {
          if (exp === "0-2")
            return lawyer.experience >= 0 && lawyer.experience <= 2;
          if (exp === "3-5")
            return lawyer.experience >= 3 && lawyer.experience <= 5;
          if (exp === "6-10")
            return lawyer.experience >= 6 && lawyer.experience <= 10;
          if (exp === "10+") return lawyer.experience > 10;
          return false;
        });
      });
    }

    // Apply badge filters
    if (badges.includes("topRated")) {
      filteredLawyers = filteredLawyers.filter((l) => l.topRated);
    }
    if (badges.includes("fastResponse")) {
      filteredLawyers = filteredLawyers.filter((l) => l.fastResponse);
    }
    if (badges.includes("risingStar")) {
      filteredLawyers = filteredLawyers.filter((l) => l.risingStar);
    }

    // Calculate total pages based on filtered results
    const totalPages = Math.ceil(filteredLawyers.length / limit);

    // Apply pagination to filtered results
    const paginatedLawyers = filteredLawyers.slice(offset, offset + limit);

    return NextResponse.json({
      lawyers: paginatedLawyers,
      pagination: {
        page,
        limit,
        total: filteredLawyers.length,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error in GET /api/lawyers:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
