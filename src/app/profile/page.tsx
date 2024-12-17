"use client";

import { getProfile } from "@/serveraction/serverActions";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteBtn from "../components/DeleteBtn";

export function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [courseData, setCourseData] = useState<{ _id: string; img: string; coursename: string; teacher: string; subject: string; coursetype: string; totalmember: number; price: number; }[]>([]);

  useEffect(() => {
    async function fetchProfile() {
      const initialProfile = await getProfile();
      setProfile(initialProfile);
      setCourseData(initialProfile.course);
    }
    fetchProfile();
  }, []);

  if (!profile) {
    return ( 
    <div className="flex items-center justify-center h-screen bg-[#EAEFF8] min-h-screen">
      <div className="bg-gray-300 w-[400px] h-[500px] p-8 rounded-lg shadow-md text-center ">
        <div className="flex justify-center mb-4">
          <Image
            src="/image/icon.png" 
            alt="access denied"
            width={300}
            height={300}
          />
        </div>

        <h2 className="text-xl font-bold text-black mb-2">
          หน้านี้ไม่สามารถเข้าได้
        </h2>
        <p className="text-black mb-6">กรุณาเข้าสู่ระบบก่อนใช้งาน</p>

        <div className="flex justify-center space-x-4 mb-4">
          <button className="bg-blue-500 text-white w-[100px] h-[40px] text-xl rounded-md hover:bg-blue-600 transition">
          <Link href="/login" >Login</Link>
          </button>
          <button className="bg-blue-400 text-white w-[100px] h-[40px] text-xl rounded-md hover:bg-blue-600 transition">
          <Link href="/signup" >Sign up</Link>
          </button>
        </div>
        <button className="bg-gray-400 text-white w-[100px] h-[40px] text-xl rounded-md hover:bg-gray-600 transition">
          <Link href="/" >Back</Link>
          </button>
      </div>
    </div>
  
    )
  }

  return (
      <div className="flex flex-col md:flex-row bg-[#EAEFF8] min-h-screen">
      <div className="md:mr-4">
        <Navbar />
      </div>
      <main className="overflow-auto h-screen w-full">
   <div className="bg-[#B1C9EF] rounded-lg p-5 w-full sm:w-[1000px] mx-auto mt-5 shadow-md">
    <div className="flex items-center">
      <Image
        src="/image/icon.png"
        alt="icon Profile"
        width={200}
        height={200}
        className=" p-2"
      />
      <div className="ml-4">
        <p className="text-3xl text-black font-bold">
          {profile.user.username}
        </p>
        <p className="text-xl text-gray-600 font-semibold">
          <span className="font-bold">Name-Surname :</span> {profile.user.fullName}
        </p>
        <p className="text-xl text-gray-600">
          <span className="font-bold">Email :</span> {profile.user.email}
        </p>
        <p className="text-xl text-gray-600">
          <span className="font-bold">Phone Number :</span> {profile.user.phone}
        </p>
      </div>
    </div>
    <div className="mt-4 text-right">
      <button className="bg-gray-300 text-xl text-black py-1 px-3 rounded-md shadow-sm hover:bg-gray-400">
        Edit Profile
      </button>
    </div>
  </div>
  <div className = "mb-4"></div>
  <button className="bg-[#638ECB] text-xl ml-4 p-3 text-white font-bold rounded-full">
          Your Course
        </button>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 ml-10 gap-5">
    {courseData && courseData.length > 0 ? (
      courseData.map((val) => (
        <div
          key={val._id}
          className=" rounded-lg shadow-md w-[400px] overflow-hidden"
        >
          <Image
            className="w-full h-48 object-cover"
            src={val.img}
            width={100}
            height={100}
            alt={val.coursename}
            priority
          />
          <div className="p-4">
            <h3 className="bg- text-xl font-bold text-gray-800">
              {val.coursename}
            </h3>
            <p className="text-sm text-gray-500">Teacher: {val.teacher}</p>
            <p className="text-sm text-gray-500">Subject: {val.subject}</p>
            <p className="text-sm text-gray-500">Location: {val.coursetype}</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">
                จำนวนคน: {val.totalmember} คน
              </p>
              <p className="text-lg text-green-600 font-semibold">
                {val.price} บาท / คน
              </p>
            </div>
            <div className="mt-5 flex space-x-3">
              <Link
                className="bg-gray-500 text-white py-2 px-3 rounded-md"
                href={`/edit/${val._id}`}
              >
                Edit
              </Link>
              <DeleteBtn course_id={val._id} />
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="bg-gray-500 p-3 my-3">Not have any post yet</p>
    )}
  </div>
  <div className = "mb-4"></div>
  <button className="bg-[#638ECB] text-xl ml-4 p-3 text-white font-bold rounded-full">
          Favortie
        </button>
</main>
</div>
  );
}
export default Profile;
