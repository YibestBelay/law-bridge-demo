import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (code) {
      // Exchange code for session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        return NextResponse.redirect(
          new URL("/auth?error=google_auth_failed", request.url)
        );
      }

      // Check if profile exists, create if not
      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (profileError && profileError.code === "PGRST116") {
          // Profile doesn't exist, create it
          await supabase.from("profiles").insert({
            id: data.user.id,
            email: data.user.email || "",
            full_name: data.user.user_metadata?.full_name || null,
            phone: data.user.user_metadata?.phone || null,
            role: data.user.user_metadata?.role || "user",
            created_at: new Date().toISOString(),
          });
        }
      }

      return NextResponse.redirect(new URL("/", request.url));
    }

    // Initiate Google OAuth
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: new URL("/api/auth/google", request.url).toString(),
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.redirect(data.url);
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
