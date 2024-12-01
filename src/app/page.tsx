"use client";

import Search from "./components/Search";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";

function Home() {
  //JavaScript
  const [postData, setPostData] = useState([]);

  console.log(postData);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPostData(data.posts);
    } catch (error) {
      console.log("Error loading posts: ", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:mr-4">
        <Navbar />
      </div>
      <main className="container mx-auto m-3">
        <Search />
        Choose Subject
        <hr className="my-3" />
        <button className="bg-green-500 p-3">
          <Link href={"/create"}>Create Subject</Link>
        </button>
        {postData && postData.length > 0 ? (
          postData.map((val) => {
            return (
              <div key={val._id} className="shadow-xl my-10 p-10 rounded-xl">
                <h3>{val.title} </h3>
                <Image 
                  src={val.img}
                  width={300}
                  height={0}
                  alt={val.title}
                  priority
                />
              </div>
            );
          })
        ) : (
          <p className="bg-gray-500 p-3 my-3"> Not have any post yet</p>
        )}
      </main>
    </div>
  );
}

export default Home;
