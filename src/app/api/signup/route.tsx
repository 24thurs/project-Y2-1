import { NextResponse } from "next/server";
import { connectDatabases } from "@/config/config";
import { User } from "@/models/models";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { userName, fullName, email, phone, password, role } = await req.json();

    if (!userName || !fullName || !email || !phone || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { mysqlConnection } = await connectDatabases();

    // Insert into MongoDB
    const userMongo = await User.create({
      username: userName,
      fullname: fullName,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    await userMongo.save();

    // Get the MongoDB _id
    const _id = userMongo._id.toString(); // Make sure it's a string for MySQL compatibility


    // Insert into MySQL
    const [result] = await mysqlConnection.execute(
      "INSERT INTO user (_id, username, fullname, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [_id, userName, fullName, email, phone, hashedPassword, role]
    );

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      // Handling duplicate key errors in MongoDB
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