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
    <div className="container mx-auto py-10 px-5">
      <h3 className="text-3xl font-bold">Create Course</h3>
      <hr className="my-3" />
      <Link
        href="/"
        className="bg-gray-400 inline-block border py-2 px-3 rounded my-3"
      >
        Back
      </Link>
      <form action="" className="grid place-content-center" onSubmit={handleSubmit}>
        <input onChange={((e) => setTitle(e.target.value))}
          type="text"
          className="w-[300px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
          placeholder="Post title"
        />
        <input onChange={((e) => setImg(e.target.value))}
          type="text"
          className="w-[300px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
          placeholder="Post Img Url"
        />
        <textarea onChange={((e) => setContent(e.target.value))}
          className="w-[300px] bg-gray-200 py-2 px-3 rounded text-lg my-2"
          placeholder="Enter Content"
        ></textarea>
        <button
          type="submit"
          className="w-[300px] bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};
export default CreatePage;
