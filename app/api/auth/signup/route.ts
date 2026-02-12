import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, phone, role } = body;

    // Log received data for debugging (remove in production)
    console.log("Signup request received:", {
      email: email ? `${email.substring(0, 5)}...` : "missing",
      password: password ? "***" : "missing",
      fullName: fullName || "missing",
      phone: phone || "missing",
      role: role || "missing",
      allFields: Object.keys(body),
    });

    // Validate required fields with specific error messages
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }
    if (!fullName) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 }
      );
    }
    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }
    if (!role) {
      return NextResponse.json(
        { error: "Role is required. Please select User or Lawyer" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Validate role
    if (role !== "user" && role !== "lawyer") {
      return NextResponse.json(
        { error: `Invalid role: "${role}". Must be "user" or "lawyer"` },
        { status: 400 }
      );
    }

    // Check environment variables before creating client
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json(
        { 
          error: "Server configuration error. Supabase credentials are missing. Please check your .env.local file.",
          hint: "Create a .env.local file with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
        },
        { status: 500 }
      );
    }

    let supabase;
    try {
      supabase = await createClient();
    } catch (clientError: any) {
      console.error("Failed to create Supabase client:", clientError);
      return NextResponse.json(
        { 
          error: "Failed to initialize database connection",
          details: clientError.message
        },
        { status: 500 }
      );
    }

    // Sign up the user
    console.log("Attempting Supabase signup...");
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          phone: phone.trim(),
          role: role,
        },
      },
    });

    console.log("Supabase signup response:", {
      hasUser: !!authData?.user,
      hasSession: !!authData?.session,
      hasError: !!authError,
      errorMessage: authError?.message,
      errorCode: authError?.status,
    });

    if (authError) {
      console.error("Supabase auth error details:", {
        message: authError.message,
        status: authError.status,
        name: authError.name,
      });
      return NextResponse.json({ 
        error: authError.message || "Failed to create account",
        code: authError.status,
      }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    // Profile is automatically created by trigger, but we should update it with the correct data
    // Wait a moment for trigger to create profile
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if profile exists (created by trigger)
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("id", authData.user.id)
      .single();

    if (profileCheckError && profileCheckError.code !== "PGRST116") {
      console.error("Error checking profile:", profileCheckError);
    }

    if (!existingProfile) {
      // Profile doesn't exist, create it
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        email: email.trim(),
        full_name: fullName.trim(),
        phone: phone.trim(),
        role: role,
        created_at: new Date().toISOString(),
      });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        // Check if it's a duplicate key error (trigger already created it)
        if (profileError.code === "23505") {
          console.log("Profile already exists (created by trigger), updating...");
          // Update instead
          await supabase
            .from("profiles")
            .update({
              full_name: fullName.trim(),
              phone: phone.trim(),
              role: role,
            })
            .eq("id", authData.user.id);
        }
      }
    } else {
      // Profile exists (created by trigger), update it with correct data
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim(),
          phone: phone.trim(),
          role: role,
        })
        .eq("id", authData.user.id);

      if (updateError) {
        console.error("Profile update error:", updateError);
      }
    }

    // If role is lawyer, create lawyer entry (or let trigger handle it)
    if (role === "lawyer") {
      const { data: existingLawyer } = await supabase
        .from("lawyers")
        .select("id")
        .eq("id", authData.user.id)
        .single();

      if (!existingLawyer) {
        // Create basic lawyer entry
        const { error: lawyerError } = await supabase.from("lawyers").insert({
          id: authData.user.id,
          title: "Attorney",
          specialization: ["General Law"],
          location: "Addis Ababa",
          consultation_fee: 2500,
          verified: false,
          availability_status: "any",
        });

        if (lawyerError) {
          console.error("Lawyer entry creation error:", lawyerError);
          // Don't fail - lawyer can create their profile later
        }
      }
    }

    // Check if email confirmation is required
    const requiresEmailConfirmation = !authData.session;

    return NextResponse.json(
      {
        message: requiresEmailConfirmation
          ? "Account created successfully! Please check your email inbox (and spam folder) for a verification link. You must verify your email before you can sign in."
          : "Account created successfully!",
        requiresEmailConfirmation,
        user: {
          id: authData.user.id,
          email: authData.user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    
    // Handle specific error types
    if (error.message?.includes("timeout") || error.code === "UND_ERR_CONNECT_TIMEOUT") {
      return NextResponse.json(
        {
          error: "Connection timeout. Please check your internet connection and Supabase configuration.",
        },
        { status: 504 }
      );
    }
    
    if (error.message?.includes("fetch failed")) {
      return NextResponse.json(
        {
          error: "Unable to reach authentication service. Please verify your Supabase configuration.",
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        error: error.message || "An unexpected error occurred. Please try again.",
        details: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
