import { connectDatabases } from "@/config/config";
import { Course, Subject } from "@/models/models";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDatabases();

    const url = new URL(req.url);
    const query = url.searchParams.get("query");

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    const courses = await Course.find({
      $or: [
        { subject: { $regex: query, $options: "i" } },
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

export async function POST(req: Request){
  try {
    const {subject_name} = await req.json();

    await connectDatabases();
    const subject = await Subject.create({
      subject_name
    })
    await subject.save()
    return NextResponse.json ({ message: "create successfully" },
    { status: 201 });

  } catch(error) {
    return NextResponse.json(
      { error: "Failed to create subject" },
      { status: 400 }
    );
  }
  
}