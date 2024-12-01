import { NextResponse } from "next/server";
import { connectMongoDB } from "@/config/config";
import { User } from "@/models/models";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { userName, fullName, email, phone, password, role } =
      await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    const user = await User.create({
      username: userName,
      fullname: fullName,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    await user.save();

    return await NextResponse.json({ message: "User registered" });
    // return NextResponse.json({userName, fullName, email, phone, password, role})
  } catch(error) {
    console.log(error)
    return await NextResponse.json(error);
  }
};
