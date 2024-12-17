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
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      // Handling duplicate key errors
      const field = Object.keys(error.keyValue)[0];
      console.log(`${field} already exists`);
      return NextResponse.json(
        { error: `${field} already exists` },
        { status: 409 }
      );
    }
    // Handle other types of errors
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 400 }
    );
  }
};
