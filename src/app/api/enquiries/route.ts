
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { checkRateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

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

    // Rate limit: max 10 enquiries per 5 minutes per IP
    const rateCheck = checkRateLimit(`enquiry_ip_${ip}`, 10, 5 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many enquiries. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot spam check (reject if hidden bot field is filled)
    if (body.website_trap || body.company_url) {
      return NextResponse.json(
        { success: false, message: "Spam submission detected." },
        { status: 400 }
      );
    }

    const fullName =
      typeof body.fullName === "string" ? body.fullName.trim() : "";
    const phone =
      typeof body.phone === "string" ? body.phone.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";
    const allowedSources = [
      "enquiry",
      "register-interest",
      "contact",
    ];
    const source = allowedSources.includes(body.source)
      ? body.source
      : "enquiry";

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required." },
        { status: 400 }
      );
    }

    if (
      fullName.length > 100 ||
      phone.length > 30 ||
      email.length > 254 ||
      message.length > 2000
    ) {
      return NextResponse.json(
        { success: false, message: "One or more fields are too long." },
        { status: 400 }
      );
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email." },
        { status: 400 }
      );
    }

    await connectDB();

    const enquiry = await Enquiry.create({
      fullName,
      phone,
      email,
      message,
      source,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been submitted successfully.",
        id: enquiry._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enquiry submission failed:", error);

    return NextResponse.json(
      { success: false, message: "Unable to submit your enquiry." },
      { status: 500 }
    );
  }
}
