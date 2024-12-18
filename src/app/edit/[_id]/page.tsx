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
    <div className="container mx-auto py-10 px-5">
      <div className="flex items-center justify-center w-full h-[70px] border-4 border-blue-400 bg-blue-400 p-6 mb-6">
        <h3 className="text-3xl font-bold text-white">Edit Course</h3>
      </div>
      <hr className="my-3" />
      <form
        className="grid gap-6"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          await updateCourse(unwrappedParams._id, formData);
          router.refresh();
          router.push("/");
        }}
      >
        <div className="flex flex-col border-4 border-blue-100 bg-blue-100 p-6 rounded-lg">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Course Image"
              className="w-full max-w-md h-auto my-2 mx-auto"
              onError={() => setImageUrl("")}
            />
          )}
          <input
            type="text"
            className="w-full py-2 px-3 rounded text-lg my-2"
            defaultValue={courseData.img}
            name="img"
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <input
            type="text"
            className="w-full py-2 px-3 rounded text-lg my-2"
            placeholder="Course name"
            name="courseName"
            defaultValue={courseData.coursename}
            required
          />
          <select
            className="w-full py-2 px-3 rounded text-lg my-2"
            name="subject"
            defaultValue={courseData.subject}
            required
          >
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="english">English</option>
            <option value="art">Art</option>
            <option value="music">Music</option>
            <option value="physical_education">Physical Education</option>
            <option value="computer_science">Computer Science</option>
            <option value="economics">Economics</option>
            <option value="geography">Geography</option>
            <option value="literature">Literature</option>
            <option value="philosophy">Philosophy</option>
            <option value="psychology">Psychology</option>
            <option value="sociology">Sociology</option>
            <option value="other">Other...</option>
          </select>
          <input
            className="w-full py-2 px-3 rounded text-lg my-2"
            placeholder="Teacher Name"
            type="text"
            name="teacher"
            defaultValue={courseData.teacher}
            required
          />
          <textarea
            className="w-full h-[200px] py-2 px-3 rounded text-lg my-2"
            placeholder="Course detail"
            name="detail"
            defaultValue={courseData.detail}
            required
          ></textarea>
          <input
            className="w-full py-2 px-3 rounded text-lg my-2"
            placeholder="Hours content"
            name="hour"
            type="number"
            min="1"
            defaultValue={courseData.hour}
            required
          />
          <div className="flex flex-col md:flex-row md:space-x-4">
            <input
              className="w-full md:w-1/2 py-2 px-3 rounded text-lg my-2"
              placeholder="Total of course"
              name="totalMember"
              type="number"
              min="0"
              defaultValue={courseData.totalmember}
              required
            />
            <input
              className="w-full md:w-1/2 py-2 px-3 rounded text-lg my-2"
              placeholder="Price"
              name="price"
              type="number"
              min="0"
              defaultValue={courseData.price}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="courseType"
                value="online"
                className="mr-2"
                required
                defaultChecked={courseData.coursetype === "online"}
              />
              <span className="w-full md:w-auto bg-red-500 text-white border py-2 px-3 rounded text-lg my-2 text-center">
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
              <span className="w-full md:w-auto bg-yellow-500 text-white border py-2 px-3 rounded text-lg my-2 text-center">
                Onsite
              </span>
            </label>
          </div>
          <div className="flex flex-col md:flex-row md:justify-end md:space-x-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
            >
              Edit Course
            </button>
            <Link
              href="/"
              className="flex items-center justify-center w-full md:w-auto bg-gray-400 border py-2 px-3 rounded text-lg my-2"
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
