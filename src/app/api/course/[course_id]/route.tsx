import { connectDatabases } from "@/config/config";
import { Course } from "@/models/models";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDatabases();

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
      const { img, courseName, subject, teacher, detail, hour, totalMember, price, courseType, userId } = await req.json();
  
      if (!img || !courseName || !subject || !teacher || !detail || !hour || !totalMember || !price || !courseType || !userId) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
  
      const { mysqlConnection } = await connectDatabases();
      const url = new URL(req.url);
      const id = url.pathname.split("/").pop();
  
      // Update MongoDB
      const updatedCourseMongo = await Course.findByIdAndUpdate(
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
          userid: userId,
        },
        { new: true }
      );
  
      if (!updatedCourseMongo) {
        return NextResponse.json(
          { error: "Course not found" },
          { status: 404 }
        );
      }
  
      // Update MySQL
      const [result] = await mysqlConnection.execute(
        "UPDATE courses SET img = ?, coursename = ?, subject = ?, teacher = ?, detail = ?, hour = ?, totalmember = ?, price = ?, coursetype = ?, userid = ? WHERE _id = ?",
        [img, courseName, subject, teacher, detail, hour, totalMember, price, courseType, userId, id]
      );
  
      return NextResponse.json(
        { message: "Course updated successfully", course: updatedCourseMongo },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  }