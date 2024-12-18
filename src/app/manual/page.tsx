"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

const Manual = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const guides = [
    {
      id: 1,
      title: "How to create Course",
      content: "Can create courses by going to the Home page click Create Course, fill in complete information and create it.",
      image: "/image/manual01.png",
    },
    {
      id: 2,
      title: "How to join class",
      content: "You can view Courses on 'Home'. When you are interested in one, you can click 'Join' to join the class.",
      image: "/image/manual03.png",
    },
    {
      id: 3,
      title: "How to review course",
      content: "You can select the 'Review' menu and select the course you want to review.",
      image: "/image/manaul04.png",
    },
    {
      id: 4,
      title: "How to report a problem",
      content: "You can report problems via email studyfinder@gmail.com or add Line id: @studyfinder",
      image: "/image/manual05.png",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-[#EAEFF8] min-h-screen">
      <div className="md:w-1/4">
        <Navbar />
      </div>
      <div className="w-full max-w-3xl mx-auto mt-8 flex-grow flex flex-col p-4">
        <div className="w-full text-center mt-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#333]">Manual</h1>
          <hr className="w-full mx-auto border-t-4 border-gray-400 my-4" />
        </div>
        {guides.map((guide, index) => (
          <div key={guide.id} className="mb-2">
            <button
              onClick={() => toggleDropdown(index)}
              className="flex justify-between items-center w-full bg-[#8AAEE0] rounded-lg p-4"
            >
              <div className="flex items-center">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  width={60}
                  height={60}
                  className="mr-4"
                />
                <span className="font-bold text-black text-lg md:text-2xl">{guide.title}</span>
              </div>
              <span
                className={`transform transition-transform ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="bg-[#b9ceea] p-4 rounded-b-lg">
                <p>{guide.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manual;
