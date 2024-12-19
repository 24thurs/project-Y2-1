import { connectDatabases } from "@/config/config";
import { EnrollDate } from "@/models/models";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, course_id } = await req.json();
    const { mysqlConnection } = await connectDatabases();

    // Insert into MongoDB and retrieve the _id
    const enrollMongo = await EnrollDate.create({ user_id: userId, course_id });
    await enrollMongo.save();

    // Get the MongoDB _id
    const _id = enrollMongo._id.toString(); // Make sure it's a string for MySQL compatibility

    // Insert into MySQL with the MongoDB _id
    const [result] = await mysqlConnection.execute(
      "INSERT INTO enrolldates (_id, user_id, course_id) VALUES (?, ?, ?)",
      [_id, userId, course_id] // Include MongoDB _id here
    );

    return NextResponse.json({ success: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error enrolling user:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request) {
  try {
    const { userId, course_id } = await req.json();
    const { mysqlConnection } = await connectDatabases();

    // Delete from MongoDB
    await EnrollDate.findOneAndDelete({ user_id: userId, course_id });

    // Delete from MySQL
    await mysqlConnection.execute(
      "DELETE FROM enrolldates WHERE user_id = ? AND course_id = ?",
      [userId, course_id]
    );

    return NextResponse.json({ success: "Enrollment canceled" }, { status: 200 });
  } catch (error) {
    console.error("Error canceling enrollment:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}