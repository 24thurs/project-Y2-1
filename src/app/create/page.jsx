"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const CreatePage = () => {
  // const [title, setTitle] = useState("");
  // const [img, setImg] = useState("");
  // const [content, setContent] = useState("");

  // const router = useRouter();

  return (
    <div className="container mx-auto py-10 px-5">
      <div className="flex items-center justify-center w-[260px] h-[70px] border-4 border-blue-400 bg-blue-400 p-6">
      <h3 className="text-3xl font-bold">Create Course</h3>
      </div>
    
      <hr className="my-3" />
      <form action="" className="grid">
      <div className=" flex flex-col border-4 border-blue-100 bg-blue-100 p-6">
      <div className="flex flex-col"></div>
      <input
          type="text"
          className="w-[800px] h-[200px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
          placeholder="Post Img Url" // ใส่รูป
        />
         <input
          type="text"
          className="w-[700px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
          placeholder="Course name" // ชื่อคอร์ส
        />
        <textarea
          name=""
          id=""
          className="w-[400px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
          placeholder="Enter Subject" // เป็นให้เลือกวิชาและระดับชั้นแบบมีช้อย
        ></textarea>
        <textarea
          name=""
          id=""
          className="w-[600px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
          placeholder="Teacher Name" // เป็นให้เลือกตามชื่อผู้สอนวิชานั้นๆ
        ></textarea>
         <input
          type="text"
          className="w-[600px] h-[200px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
          placeholder="Course detail" // คำอธิบาย
        />
        <textarea
          name=""
          id=""
          className="w-[400px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
          placeholder="Hours content" // จำนวนชั่วโมงเรียน
        ></textarea>
        <div className="flex space-x-4">
        <textarea
          name=""
          id=""
          className="w-[300px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
          placeholder="Total of course" // จำนวนคนเรียนที่ต้องการ
        ></textarea>
        <textarea
          name=""
          id=""
          className="w-[300px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
          placeholder="Price" //ราคาต่อคน
        ></textarea>
        </div>
        <div className="flex space-x-4">
        <button
          type="submit"
          className="w-[100px] bg-red-500 text-white border py-2 px-3 rounded text-lg my-2"
          >Online</button>  
        <button
          type="submit"
          className="w-[100px] bg-yellow-500 text-white border py-2 px-3 rounded text-lg my-2"
        >Onsite</button> 
        </div>
        <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="w-[200px] bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
        >Create Course</button>  
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
export default CreatePage;
