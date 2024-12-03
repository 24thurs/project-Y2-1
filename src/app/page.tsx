"use client";

import Search from "./components/Search";
import Link from "next/link";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";

function Home() {
  //JavaScript
  const [postData, setPostData] = useState([]);

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
        <div className="shadow-xl my-10 p-10 rounded-xl">
          <Image
            src="/path/to/image.jpg"
            width={400}
            height={400}
            alt="image"
            priority
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
