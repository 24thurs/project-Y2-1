import React from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

const Manual = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:mr-4">
        <Navbar />
      </div>
      <main className="overflow-auto h-screen w-full">
        Manual
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3 gap-5">
          <div className="shadow-xl my-10 p-5 sm:p-10 rounded-xl">
            <h4>How to create Course (Student) </h4>
            <Image
              src="/path/to/image.jpg"
              width={400}
              height={400}
              alt="image"
              priority
            />
            <p>วิธีการสร้างคอร์สเรียนเพื่อใช้ในการหาเพื่อนเข้าร่วมคลาส</p>
          </div>
          <div className="shadow-xl my-10 p-5 sm:p-10 rounded-xl">
            <h4>How to create Course (Teacher) </h4>
            <Image
              src="/path/to/image.jpg"
              width={400}
              height={400}
              alt="image"
              priority
            />
            <p>วิธีการสร้างคอร์สเรียนเพื่อใช้ในการหานักเรียนเข้าร่วมคลาส</p>
          </div>
          <div className="shadow-xl my-10 p-5 sm:p-10 rounded-xl">
            <h4>How to join class</h4>
            <Image
              src="/path/to/image.jpg"
              width={400}
              height={400}
              alt="image"
              priority
            />
            <p>วิธีเข้าร่วมคลาสเรียน</p>
          </div>
          <div className="shadow-xl my-10 p-5 sm:p-10 rounded-xl">
            <h4>How to review</h4>
            <Image
              src="/path/to/image.jpg"
              width={400}
              height={400}
              alt="image"
              priority
            />
            <p>วิธีรีวิวการวิชาเรียน</p>
          </div>
          <div className="shadow-xl my-10 p-5 sm:p-10 rounded-xl">
            <h4>How to contact Teacher</h4>
            <Image
              src="/path/to/image.jpg"
              width={400}
              height={400}
              alt="image"
              priority
            />
            <p>วิธีการติดต่อผู้สอนหรือผู้สร้างคอร์สเรียน</p>
          </div>
          <div className="shadow-xl my-10 p-5 sm:p-10 rounded-xl">
            <h4>How to Customer Service </h4>
            <Image
              src="/path/to/image.jpg"
              width={400}
              height={400}
              alt="image"
              priority
            />
            <p>วิธีการแจ้งปัญหาที่เกิดขึ้นกับระบบ</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Manual;
