"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh when submitting data

    if (!title || !img || !content) {
      alert("Please complete all inputs");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, img, content }), //include data in body
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto py-10 px-5">
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
    // <div className="container mx-auto py-10 px-5">
    //   <h3 className="text-3xl font-bold">Create Course</h3>
    //   <hr className="my-3" />
    //   <Link
    //     href="/"
    //     className="bg-gray-400 inline-block border py-2 px-3 rounded my-3"
    //   >
    //     Back
    //   </Link>
    //   <form action="" className="grid place-content-center" onSubmit={handleSubmit}>
    //     <input onChange={((e) => setTitle(e.target.value))}
    //       type="text"
    //       className="w-[300px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
    //       placeholder="Post title"
    //     />
    //     <input onChange={((e) => setImg(e.target.value))}
    //       type="text"
    //       className="w-[300px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
    //       placeholder="Post Img Url"
    //     />
    //     <textarea onChange={((e) => setContent(e.target.value))}
    //       className="w-[300px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
    //       placeholder="Enter Content"
    //     ></textarea>
    //     <button
    //       type="submit"
    //       className="w-[300px] bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
    //     >
    //       Create Post
    //     </button>
    //   </form>
    // </div>
  );
};
export default CreatePage;
