import { NextRequest, NextResponse } from "next/server";

// Simple test endpoint to check if API routes are working
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "API is working",
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    nodeEnv: process.env.NODE_ENV,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: "Received data",
      receivedFields: Object.keys(body),
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }
}
