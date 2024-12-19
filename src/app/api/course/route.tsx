import { NextResponse } from "next/server";
import { connectDatabases } from "../../../config/config";
import {
  Course,
  CreateDate,
  Subject,
  EnrollDate,
} from "../../../models/models";

export const POST = async (req: Request) => {
  try {
    const {
      img,
      courseName,
      subject,
      teacher,
      detail,
      hour,
      totalMember,
      price,
      courseType,
      userId,
    } = await req.json();

    if (
      !img ||
      !courseName ||
      !subject ||
      !teacher ||
      !detail ||
      !hour ||
      !totalMember ||
      !price ||
      !courseType ||
      !userId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { mysqlConnection } = await connectDatabases();

    // Insert into MongoDB
    const courseMongo = await Course.create({
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
    });
    await courseMongo.save();

    // Get the MongoDB _id
    const _id = courseMongo._id.toString(); // Make sure it's a string for MySQL compatibility

    // Insert into MySQL
    const [result] = await mysqlConnection.execute(
      "INSERT INTO courses (_id, img, coursename, subject, teacher, detail, hour, totalmember, price, coursetype, userid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        _id,
        img,
        courseName,
        subject,
        teacher,
        detail,
        hour,
        totalMember,
        price,
        courseType,
        userId,
      ]
    );

    const subjectDoc = await Subject.findOne({ subject_name: subject });
    if (!subjectDoc) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }
    const subject_id = subjectDoc._id.toString();

    const createDateMongo = new CreateDate({
      user_id: userId,
      subject_id,
      course_id: _id,
    });
    await createDateMongo.save();

    // Insert createDateMongo data into MySQL
    await mysqlConnection.execute(
      "INSERT INTO CreateDates (_id, user_id, subject_id, course_id, create_date) VALUES (?, ?, ?, ?, ?)",
      [createDateMongo._id.toString(), userId, subject_id, _id, new Date()]
    );

    return NextResponse.json(
      { message: "User created course successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

export const GET = async () => {
  await connectDatabases();
  const courses = await Course.find({});
  const number_roll = await EnrollDate.aggregate([
    {
      $group: {
        _id: "$course_id",
        count: { $sum: 1 },
      },
    },
  ]);

  return NextResponse.json({ courses, number_roll });
};

export const DELETE = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing course ID" }, { status: 400 });
    }

    const { mysqlConnection } = await connectDatabases();

    // Delete from MongoDB
    await Course.findByIdAndDelete(id);

    // Delete from MySQL
    await mysqlConnection.execute("DELETE FROM courses WHERE _id = ?", [id]);

    return NextResponse.json(
      { message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
