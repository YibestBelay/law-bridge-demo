import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Sign in the user
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 401 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
    }

    // Check if email is verified
    if (!authData.user.email_confirmed_at) {
      return NextResponse.json(
        {
          error:
            "Please verify your email address before signing in. Check your inbox for the verification link.",
        },
        { status: 403 }
      );
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
    }

    return NextResponse.json(
      {
        message: "Signed in successfully",
        user: {
          id: authData.user.id,
          email: authData.user.email,
          role: profile?.role || "user",
          full_name:
            profile?.full_name || authData.user.user_metadata?.full_name,
        },
        session: authData.session,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
