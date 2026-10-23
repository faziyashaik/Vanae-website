import { NextResponse } from "next/server";
import {
  verifyAdminCredentials,
  createSessionToken,
  getSessionCookieOptions,
} from "@/lib/auth";
import { isRateLimited, recordAttempt, resetRateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateKey = `admin_login_${ip}`;

    // Rate limit: max 5 failed login attempts per 15 minutes per IP
    const rateCheck = isRateLimited(rateKey, 5, 15 * 60 * 1000);
    if (rateCheck.limited) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many login attempts. Please wait 15 minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const identifier =
      typeof body.identifier === "string"
        ? body.identifier.trim()
        : typeof body.email === "string"
        ? body.email.trim()
        : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "Email/username and password are required." },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminCredentials(identifier, password);
    if (!isValid) {
      // Record a failed attempt only on incorrect credentials
      recordAttempt(rateKey, 15 * 60 * 1000);

      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Reset rate limit on successful authentication
    resetRateLimit(rateKey);

    const token = await createSessionToken(identifier);
    const cookieOptions = getSessionCookieOptions();

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
      },
      { status: 200 }
    );

    response.cookies.set({
      ...cookieOptions,
      value: token,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, message: "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}
