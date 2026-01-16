import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const lawyerId = params.id;

    // Fetch lawyer profile with related data
    const { data: lawyer, error: lawyerError } = await supabase
      .from("lawyers")
      .select(
        `
        *,
        profiles:profiles!inner (
          id,
          full_name,
          email,
          phone,
          created_at
        )
      `
      )
      .eq("id", lawyerId)
      .single();

    if (lawyerError || !lawyer) {
      return NextResponse.json(
        { error: "Lawyer not found" },
        { status: 404 }
      );
    }

    // Fetch reviews for this lawyer
    const { data: reviews } = await supabase
      .from("reviews")
      .select(
        `
        *,
        client:profiles!reviews_client_id_fkey (
          id,
          full_name
        )
      `
      )
      .eq("lawyer_id", lawyerId)
      .order("created_at", { ascending: false })
      .limit(10);

    // Fetch recent cases handled (if needed)
    const { data: recentCases } = await supabase
      .from("cases")
      .select("id, title, category, status, created_at")
      .eq("lawyer_id", lawyerId)
      .order("created_at", { ascending: false })
      .limit(5);

    const profile = Array.isArray(lawyer.profiles)
      ? lawyer.profiles[0]
      : lawyer.profiles;

    // Transform to match frontend interface
    const lawyerData = {
      id: lawyer.id,
      name: profile?.full_name || lawyer.title || "Lawyer",
      photo: lawyer.photo_url || "👨‍💼",
      title: lawyer.title || "Attorney",
      rating: Number(lawyer.rating) || 0,
      reviews: lawyer.reviews_count || 0,
      location: lawyer.location || "Unknown",
      memberSince: new Date(profile?.created_at || lawyer.created_at).toLocaleDateString(
        "en-US",
        { month: "long", year: "numeric" }
      ),
      verified: lawyer.verified || false,
      topRated: (lawyer.rating || 0) >= 4.8,
      fastResponse:
        lawyer.response_time && parseFloat(lawyer.response_time) <= 2,
      casesHandled: lawyer.cases_handled || 0,
      successRate: Number(lawyer.success_rate) || 0,
      avgResponse: lawyer.response_time || "N/A",
      experience: lawyer.experience || 0,
      bio: lawyer.bio || "",
      specializations: lawyer.specialization || [],
      areasOfPractice: (lawyer.specialization || []).map((spec: string) => ({
        name: spec,
        icon: "⚖️",
      })),
      education: Array.isArray(lawyer.education)
        ? lawyer.education
        : lawyer.education
        ? [lawyer.education]
        : [],
      licenseNumber: lawyer.license_number || "",
      languages: (lawyer.languages || []).map((lang: string) => ({
        name: lang,
        flag: "🇪🇹",
        level: "Fluent",
      })),
      availability: {
        status: lawyer.availability_status || "any",
        responseTime: lawyer.response_time || "N/A",
        lastActive: "Recently", // TODO: Calculate from last activity
      },
      pricing: {
        consultation: Number(lawyer.consultation_fee) || 0,
        hourly: Number(lawyer.hourly_rate) || 0,
      },
      reviews: (reviews || []).map((review: any) => ({
        id: review.id,
        clientName: review.client?.full_name || "Anonymous",
        rating: review.rating,
        comment: review.comment || "",
        date: new Date(review.created_at).toLocaleDateString(),
      })),
      notableCases: (recentCases || []).map((caseItem: any) => ({
        type: caseItem.category,
        description: caseItem.title,
        outcome: caseItem.status === "completed" ? "Won" : "In Progress",
        year: new Date(caseItem.created_at).getFullYear(),
      })),
    };

    return NextResponse.json(lawyerData);
  } catch (error) {
    console.error("Error in GET /api/lawyers/[id]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
