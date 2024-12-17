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


