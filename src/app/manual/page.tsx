"use client";

import React, { useState } from "react"; 
import Image from "next/image";
import Navbar from "../components/Navbar";

const Manual = () => {
  const [openIndex, setOpenIndex] = useState(null); 

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index); 
  };

  const guides = [
    {
      id: 1,
      title: "วิธีการสร้างคอร์ส",
      content: "เนื้อหาคู่มือที่ 1",
      image: "/image/manual01.png",
    },
    {
      id: 2,
      title: "สร้างวิชาสอน",
      content: "เนื้อหาคู่มือที่ 2",
      image: "/image/manual02.png",
    },
    {
      id: 3,
      title: "เข้าร่วมเรียน",
      content: "เข้าร่วมเรียน",
      image: "/image/manual03.png",
    },
    {
      id: 4,
      title: "รีวิววิชาเรียน",
      content: "เนื้อหาคู่มือที่ 2",
      image: "/image/manaul04.png",
    },
    {
      id: 5,
      title: "ติดต่อผู้สอน",
      content: "เนื้อหาคู่มือที่ 2",
      image: "/image/manual05.png",
    },
    {
      id: 6,
      title: "แจ้งปัญหา",
      content: "เนื้อหาคู่มือที่ 2",
      image: "/image/manual06.png",
    }
    

  ];
  
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:mr-4">
        <Navbar />
      </div>
      <div className="w-full max-w-3xl mx-auto mt-8 flex-grow flex flex-col justify-center">
         <div className="w-full text-center mt-8">
         <h1 className="text-5xl font-bold text-[#333]"> 
          Manual
          </h1>
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
                  width={90}
                  height={90}
                  className="mr-4"
                />
                <span className="font-bold text-black">{guide.title}</span>
              </div>
              <span
                className={`transform transition-transform ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="bg-[#b9ceea] p-4 rounded-b-lg">
                <p>{guide.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Manual;
