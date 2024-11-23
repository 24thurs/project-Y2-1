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
      <h3 className="text-3xl font-bold">Create Course</h3>
      <hr className="my-3" />
      <Link
        href="/"
        className="bg-gray-400 inline-block border py-2 px-3 rounded my-3"
      >
        Back
      </Link>
      <form action="" className="grid">
        <input
          type="text"
          className="w-[300px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
          placeholder="Post title"
        />
        <input
          type="text"
          className="w-[300px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
          placeholder="Post Img Url"
        />
        <textarea
          name=""
          id=""
          className="w-[300px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
          placeholder="Enter Content"
        ></textarea>
        <button
          type="submit"
          className="w-[300px] bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
        >Create Post</button>
      </form>
    </div>
  );
};
export default CreatePage;
