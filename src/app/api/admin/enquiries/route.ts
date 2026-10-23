import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);

    if (!session.valid) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "All";

    const query: Record<string, unknown> = {};

    if (status && status !== "All") {
      if (["New", "Contacted", "Closed"].includes(status)) {
        query.status = status;
      }
    }

    if (search) {
      const escaped = escapeRegex(search);
      query.$or = [
        { fullName: { $regex: escaped, $options: "i" } },
        { phone: { $regex: escaped, $options: "i" } },
        { email: { $regex: escaped, $options: "i" } },
      ];
    }

    const [enquiries, totalCount, newCount] = await Promise.all([
      Enquiry.find(query).sort({ createdAt: -1 }).lean(),
      Enquiry.countDocuments({}),
      Enquiry.countDocuments({ status: "New" }),
    ]);

    return NextResponse.json({
      success: true,
      enquiries,
      stats: {
        total: totalCount,
        new: newCount,
      },
    });
  } catch (error) {
    console.error("Failed to fetch enquiries:", error);
    return NextResponse.json(
      { success: false, message: "Unable to fetch enquiries." },
      { status: 500 }
    );
  }
}
