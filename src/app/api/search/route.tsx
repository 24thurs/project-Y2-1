import { connectMongoDB } from "@/config/config";
import { Course } from "@/models/models";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectMongoDB();

    const url = new URL(req.url);
    const query = url.searchParams.get("query");

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    const courses = await Course.find({
      $or: [
        { courseName: { $regex: query, $options: "i" } },
        { subject: { $regex: query, $options: "i" } },
        { teacher: { $regex: query, $options: "i" } },
        { detail: { $regex: query, $options: "i" } }
      ]
    });

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}