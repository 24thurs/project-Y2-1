import { connectMongoDB } from "@/config/config";
import { Course } from "@/models/models";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectMongoDB();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const course = await Course.findOne({ _id: id });
    if (!course) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
    try {
        const {
            img,
            courseName,
            subject,
            teacher,
            detail,
            hour,
            totalMember,
            price,
            courseType,
            userId,
        } = await req.json();

        if (
            !img ||
            !courseName ||
            !subject ||
            !teacher ||
            !detail ||
            !hour ||
            !totalMember ||
            !price ||
            !courseType ||
            !userId
        ) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await connectMongoDB();
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop();

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            {
                img,
                coursename: courseName,
                subject,
                teacher,
                detail,
                hour,
                totalmember: totalMember,
                price,
                coursetype: courseType,
                userId,
            },
            { new: true }
        );

        if (!updatedCourse) {
            return NextResponse.json(
                { error: "Course not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Course updated successfully", course: updatedCourse },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
