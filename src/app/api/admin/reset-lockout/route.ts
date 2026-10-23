import { NextResponse } from "next/server";
import { clearAllRateLimits } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  // Safe guard: only accessible during non-production development testing
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { success: false, message: "Not available in production." },
      { status: 403 }
    );
  }

  clearAllRateLimits();

  return NextResponse.json({
    success: true,
    message: "Rate limit lockout has been reset for local development testing.",
  });
}
