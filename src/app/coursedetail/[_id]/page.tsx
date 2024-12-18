"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCourseById } from "@/serveraction/serverActions";
import Navbar from "../../components/Navbar";
import EnrollBtn from "@/app/components/EnrollBtn";
import FavoriteBtn from "@/app/components/FavoriteBtn";

interface Params {
  _id: string;
}

const CourseDetailPage = ({ params }: { params: Promise<Params> }) => {
  const [unwrappedParams, setUnwrappedParams] = useState<Params | null>(null);
  const [courseData, setCourseData] =useState<{ _id: string; img: string; coursename: string; teacher: string; subject: string; coursetype: string; totalmember: number; price: number; }[]>([]);

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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700">Loading...</h2>
          <p className="text-gray-500">
            Please wait while we fetch the course details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:mr-4">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Title */}
        <div className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md inline-block mb-6">
          <h1 className="text-3xl font-bold">Course Detail</h1>
        </div>
        <div className="max-w-full mx-auto bg-[#EAEFF8] shadow-lg rounded-lg p-6 flex flex-col md:flex-row md:flex-row-reverse">
          {/* Image Section */}
          <div className="w-[350px] h-[220px] bg-gray-200 rounded-md shadow-lg md:ml-6 mb-4 md:mb-0">
            {courseData.img ? (
              <img
                src={courseData.img}
                alt="Course Image"
                className="object-cover w-full h-full rounded-md"
              />
            ) : (
              <span className="text-gray-500 flex items-center justify-center h-full">
                350 x 220
              </span>
            )}
          </div>

          {/* Details Section */}
          <div className="flex-1 space-y-4">
            {/* Course Name */}
            <div className="bg-white rounded-xl p-4">
              <label className="text-gray-700 font-semibold">Course Name</label>
              <p className="text-lg">{courseData.coursename}</p>
            </div>

            {/* Subject */}
            <div className="bg-white rounded-xl p-4">
              <label className="text-gray-700 font-semibold">Subject</label>
              <p className="text-lg">{courseData.subject}</p>
            </div>

            {/* Teacher Name */}
            <div className="bg-white rounded-xl p-4">
              <label className="text-gray-700 font-semibold">
                Teacher Name
              </label>
              <p className="text-lg">{courseData.teacher}</p>
            </div>

            {/* Course Detail */}
            <div className="bg-white rounded-xl p-4">
              <label className="text-gray-700 font-semibold">
                Course Detail
              </label>
              <p className="text-lg">{courseData.detail}</p>
            </div>

            {/* Hours Content and Total Members */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4">
                <label className="text-gray-700 font-semibold">
                  Hours Content
                </label>
                <p className="text-lg">{courseData.hour}</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <label className="text-gray-700 font-semibold">
                  Total Members
                </label>
                <p className="text-lg">{courseData.totalmember}</p>
              </div>
            </div>

            {/* Price per Person */}
            <div className="bg-white rounded-xl p-4">
              <label className="text-gray-700 font-semibold">
                Price per Person
              </label>
              <p className="text-lg">{courseData.price}</p>
            </div>

            {/* Course Type */}
            <div className="bg-white rounded-xl p-4">
              <label className="text-gray-700 font-semibold">Course Type</label>
              <p className="text-lg">{courseData.coursetype}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Link
            href="/"
            className="bg-gray-400 text-white px-8 py-3 rounded hover:bg-gray-500 text-lg"
          >
            Back
          </Link>
          <div className="flex space-x-4">
            <EnrollBtn course_id={courseData._id} />
            <FavoriteBtn course_id={courseData._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
