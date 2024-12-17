"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCourseById } from "@/serveraction/serverActions";

interface Params {
  _id: string;
}

const CourseDetailPage = ({ params }: { params: Promise<Params> }) => {
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
        <h3 className="text-3xl font-bold">Course Detail</h3>
      </div>
      <hr className="my-3" />
      <div className="grid"></div>

      <div
        key={courseData._id}
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      >
        <img
          className="w-full h-48 object-cover"
          src={courseData.img}
          width={100}
          height={100}
          alt={courseData.coursename}
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800">{courseData.coursename}</h3>
          <div className="flex justify-2 items-center text-m space-x-2">
            <p className="text-sm text-gray-500">Teacher: {courseData.teacher}</p>
          </div>
          <p className="text-sm text-gray-500">Subject: {courseData.subject}</p>
          <p className="text-sm text-gray-500">Location: {courseData.coursetype}</p>
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-gray-500">
              จำนวนคน: {courseData.totalmember} คน
            </p>
            <p className="text-lg text-green-600 font-semibold">
              {courseData.price} บาท / คน
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-4 border-blue-100 bg-blue-100 p-6">
        <div className="w-[700px] py-2 px-3 rounded text-lg my-2">
          {courseData.coursename}
        </div>
        <div className="w-[400px] py-2 px-3 rounded text-lg my-2">
          {courseData.subject}
        </div>
        <div className="w-[600px] py-2 px-3 rounded text-lg my-2">
          {courseData.teacher}
        </div>
        <div className="w-[600px] h-[200px] py-2 px-3 rounded text-lg my-2">
          {courseData.detail}
        </div>
        <div className="w-[400px] py-2 px-3 rounded text-lg my-2">
          {courseData.hour}
        </div>
        <div className="flex space-x-4">
          <div className="w-[300px] py-2 px-3 rounded text-lg my-2">
            {courseData.totalmember}
          </div>
          <div className="w-[300px] py-2 px-3 rounded text-lg my-2">
            {courseData.price}
          </div>
        </div>
        <div className="flex space-x-4"></div>
        <div className="w-[100px] bg-red-500 text-white border py-2 px-3 rounded text-lg my-2 text-center">
          {courseData.coursetype}
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Link
          href="/"
          className="flex items-center justify-center w-[80px] bg-gray-400 inline-block border py-2 px-3 rounded text-lg my-3"
        >
          Back
        </Link>
        <button
          onClick={() => {
            if (confirm("Are you sure you want to enroll in the course?")) {
              alert("Enrolled in the course!");
            }
          }}
          className="flex items-center justify-center w-[120px] bg-green-500 text-white border py-2 px-3 rounded text-lg my-3"
        >
          Enroll
        </button>
        <button
          onClick={() => alert("Added to favourites!")}
          className="flex items-center justify-center w-[120px] bg-yellow-500 text-white border py-2 px-3 rounded text-lg my-3"
        >
          Favourite
        </button>
      </div>
    </div>
  );
};

export default CourseDetailPage;
