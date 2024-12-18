import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
    },
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);

const courseSchema = new Schema(
  {
    img: {
      type: String,
    },
    coursename: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
    },
    hour: {
      type: Number,
      required: true,
    },
    totalmember: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    coursetype: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

// Subject Schema
const subjectSchema = new Schema(
  {
    subject_id: {
      type: String,
      required: true,
      unique: true,
    },
    subject_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Subject = mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

// Review Schema
const reviewSchema = new Schema(
  {
    review_id: {
      type: String,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment_detail: {
      type: String,
    },
    course_id: {
      type: String,
      ref: "Course",
      required: true,
    },
    user_id: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

// EnrollDate Schema
const enrollDateSchema = new Schema(
  {
    enroll_date: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      ref: "User",
      required: true,
    },
    course_id: {
      type: String,
      ref: "Course",
      required: true,
    },
    date_join: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const EnrollDate = mongoose.models.EnrollDate || mongoose.model("EnrollDate", enrollDateSchema);

// CreateDate Schema
const createDateSchema = new Schema(
  {
    user_id: {
      type: String,
      ref: "User",
      required: true,
    },
    subject_id: {
      type: String,
      ref: "Subject",
      required: true,
    },
    course_id: {
      type: String,
      ref: "Course",
      required: true,
    },
    create_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const CreateDate =
  mongoose.models.CreateDate || mongoose.model("CreateDate", createDateSchema);

// Favourite Schema
const favouriteSchema = new Schema(
  {
    user_id: {
      type: String,
      ref: "User",
      required: true,
    },
    course_id: {
      type: String,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

export const Favourite =
  mongoose.models.Favourite || mongoose.model("Favourite", favouriteSchema);

