import { NextResponse } from "next/server";
import { connectMongoDB } from "@/config/config";
import { User } from "@/models/models";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
