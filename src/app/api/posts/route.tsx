import { NextResponse } from "next/server";
// import { fetchCell } from "../../../../utils/actions";
import { connectMongoDB } from "../../../lib/mongodb";
import Post from "../../../../models/post";

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
  // const { searchParams } = new URL(req.url);
  // const search = searchParams.get("search");
  // //use param from route
  // console.log(search);

  // //   const cells = await fetchCell();
  // //   return Response.json({ cells });
  // return NextResponse.redirect(new URL("/", req.url));
};
