
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    return Response.json({
      success: true,
      message: "VANAE database connected successfully!",
      database: mongoose.connection.name,
    });
  } catch (error) {
    console.error("VANAE database connection failed:", error);

    return Response.json(
      {
        success: false,
        message: "Database connection failed. Check your terminal logs.",
      },
      { status: 500 }
    );
  }
}
