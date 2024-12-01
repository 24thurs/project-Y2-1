import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../config/config";
import { Post } from "../../../models/models";

export const POST = async (req: Request) => {
  const { title, img, content } = await req.json();
  console.log(title, img, content);
  await connectMongoDB();
  await Post.create({ title, img, content }); //insert data to db
  return NextResponse.json({ message: "Post Create" }, { status: 201 });
};

export const GET = async () => {
  await connectMongoDB();
  const posts = await Post.find({});
  return NextResponse.json({ posts });
};

