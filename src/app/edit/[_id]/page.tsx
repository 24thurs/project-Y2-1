"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCourseById, updateCourse } from "@/serveraction/serverActions";

interface Params {
  _id: string;
}



const EditCoursePage = ({ params }: { params: Promise<Params> }) => {
  const [unwrappedParams, setUnwrappedParams] = useState<Params | null>(null);
  const [courseData, setCourseData] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    params.then((resolvedParams) => {
      setUnwrappedParams(resolvedParams);
    });
  }, [params]);

  useEffect(() => {
    async function fetchCourse() {
      if (unwrappedParams) {
        const initialCourse = await getCourseById(unwrappedParams._id);
        if (initialCourse) {
          setCourseData(initialCourse.course);
        }
      }
    }
    fetchCourse();
  }, [unwrappedParams]);

  const router = useRouter();

  if (!unwrappedParams || !courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto py-10 px-5">
      <div className="flex items-center justify-center w-[260px] h-[70px] border-4 border-blue-400 bg-blue-400 p-6">
        <h3 className="text-3xl font-bold">Edit Course</h3>
      </div>
      <hr className="my-3" />
      <form className="grid" onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          await updateCourse(unwrappedParams._id, formData);
          router.refresh();
          router.push("/");
        }}>
        <div className="flex flex-col border-4 border-blue-100 bg-blue-100 p-6">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Course Image"
              className="w-[400px] h-auto my-2"
              onError={() => setImageUrl("")}
            />
          )}
          <input
            type="text"
            className="w-[800px] py-2 px-3 rounded text-lg my-2"
            defaultValue={courseData.img} // ใส่ URL รูป
            name="img"
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <input
            type="text"
            className="w-[700px] py-2 px-3 rounded text-lg my-2"
            placeholder="Course name" // ชื่อคอร์ส
            name="courseName"
            defaultValue={courseData.coursename}
            required
          />
          <select
            className="w-[400px] py-2 px-3 rounded text-lg my-2"
            name="subject"
            defaultValue={courseData.subject}
            required
          >
            <option value="">Select Subject</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="english">English</option>
          </select>
          <input
            className="w-[600px] py-2 px-3 rounded text-lg my-2"
            placeholder="Teacher Name" // เป็นให้เลือกตามชื่อผู้สอนวิชานั้นๆ
            type="text"
            name="teacher"
            defaultValue={courseData.teacher}
            required
          />
          <textarea
            className="w-[600px] h-[200px] py-2 px-3 rounded text-lg my-2"
            placeholder="Course detail" // คำอธิบาย
            name="detail"
            defaultValue={courseData.detail}
            required
          ></textarea>
          <input
            className="w-[400px] py-2 px-3 rounded text-lg my-2"
            placeholder="Hours content" // จำนวนชั่วโมงเรียน
            name="hour"
            type="number"
            min="1"
            defaultValue={courseData.hour}
            required
          />
          <div className="flex space-x-4">
            <input
              className="w-[300px] py-2 px-3 rounded text-lg my-2"
              placeholder="Total of course" // จำนวนคนเรียนที่ต้องการ
              name="totalMember"
              type="number"
              min="0"
              defaultValue={courseData.totalmember}
              required
            />
            <input
              className="w-[300px] py-2 px-3 rounded text-lg my-2"
              placeholder="price" //ราคาต่อคน
              name="price"
              type="number"
              min="0"
              defaultValue={courseData.price}
              required
            />
          </div>
            <div className="flex space-x-4">
            <label className="flex items-center">
              <input
              type="radio"
              name="courseType"
              value="online"
              className="mr-2"
              required
              defaultChecked={courseData.coursetype === "online"}
              />
              <span className="w-[100px] bg-red-500 text-white border py-2 px-3 rounded text-lg my-2 text-center">
              Online
              </span>
            </label>
            <label className="flex items-center">
              <input
              type="radio"
              name="courseType"
              value="onsite"
              className="mr-2"
              defaultChecked={courseData.coursetype === "onsite"}
              />
              <span className="w-[100px] bg-yellow-500 text-white border py-2 px-3 rounded text-lg my-2 text-center">
              Onsite
              </span>
            </label>
            </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="w-[200px] bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
            >
              Edit Course
            </button>
            <Link
              href="/"
              className="flex items-center justify-center w-[80px] bg-gray-400 inline-block border py-2 px-3 rounded text-lg my-3"
            >
              Back
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCoursePage;
