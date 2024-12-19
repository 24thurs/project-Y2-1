import { NextResponse } from "next/server";
import { connectDatabases } from "@/config/config";
import { EnrollDate } from "@/models/models";
import { decrypt } from "@/serveraction/serverActions";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
      return NextResponse.json({ isEnrolled: false }, { status: 200 });
    }

    const payload = await decrypt(session);
    if (!payload) {
      return NextResponse.json({ isEnrolled: false }, { status: 200 });
    }

    const userId = payload.userId;
    const url = new URL(req.url);
    const courseId = url.searchParams.get("course_id");

    if (!courseId) {
      return NextResponse.json(
        { error: "Missing course_id parameter" },
        { status: 400 }
      );
    }

    const { mysqlConnection } = await connectDatabases();

    // Check in MongoDB
    const isEnrolledMongo = await EnrollDate.exists({
      user_id: userId,
      course_id: courseId,
    });

    // Check in MySQL
    const [rows]: any = await mysqlConnection.execute(
      "SELECT 1 FROM enrolldates WHERE user_id = ? AND course_id = ?",
      [userId, courseId]
    );

    const isEnrolledMySQL = rows.length > 0;

    const isEnrolled = isEnrolledMongo || isEnrolledMySQL;

    return NextResponse.json({ isEnrolled }, { status: 200 });
  } catch (error) {
    console.error("Error checking enrollment status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}