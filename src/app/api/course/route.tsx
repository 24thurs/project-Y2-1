import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../config/config";
import { Course } from "../../../models/models";

export const POST = async (req: Request) => {
  try{
    const {img, courseName, subject, teacher, detail, hour, totalMember, price, courseType, userId} = await req.json();
    
    if (!img || !courseName || !subject || !teacher || !detail || !hour || !totalMember || !price || !courseType || !userId) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
    
    await connectMongoDB();
    const course = await Course.create({
      img,
      coursename : courseName,
      subject,
      teacher,
      detail,
      hour,
      totalmember: totalMember,
      price,
      coursetype: courseType,
      userid: userId
    })
    
    await course.save();
    return NextResponse.json( 
      { message: "User created course successfully" },
      { status: 201 })

  } catch(error){
    return NextResponse.json(
      { error: error },
      { status: 400 }
    );
  }
};

export const GET = async () => {
  await connectMongoDB();
  const courses = await Course.find({});
  return NextResponse.json({ courses });
};

export const DELETE = async (req: Request) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing course ID" }, { status: 400 });
  }

  await connectMongoDB();
  await Course.findByIdAndDelete(id);
  return NextResponse.json({ message: "Course deleted successfully" }, { status: 200 });
};

