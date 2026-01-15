import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, phone, role } = body;

    // Validate required fields
    if (!email || !password || !fullName || !phone || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
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
        { error: 'Invalid role. Must be "user" or "lawyer"' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          role: role,
        },
      },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    // Create user profile in the database
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      email: email,
      full_name: fullName,
      phone: phone,
      role: role,
      created_at: new Date().toISOString(),
    });

    if (profileError) {
      // If profile creation fails, we still have the auth user
      // Log the error but don't fail the request
      console.error("Profile creation error:", profileError);
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
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
