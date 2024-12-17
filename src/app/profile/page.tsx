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
    <div className="flex items-center justify-center h-screen bg-gray-200">
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
    <div className="flex flex-col md:flex-row">
      <div className="md:mr-4">
        <Navbar />
      </div>
      <main className="overflow-auto h-screen w-full">
        Profile
        <p>Username: {profile.user.username}</p>
        <p>email: {profile.user.email}</p>
        <p>phone: {profile.user.phone}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3 gap-5">
          {courseData && courseData.length > 0 ? (
            courseData.map((val) => {
              return (
                <div
                  key={val._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
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
                    <h3 className="text-xl font-bold text-gray-800">
                      {val.coursename}
                    </h3>
                    <div className="flex justify-2 items-center text-m space-x-2  ">
                      <p className="text-sm text-gray-500">
                        Teacher: {val.teacher}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Subject: {val.subject}
                    </p>
                    <p className="text-sm text-gray-500">
                      location: {val.coursetype}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-gray-500">
                        จำนวนคน: {val.totalmember} คน
                      </p>
                      <p className="text-lg text-green-600 font-semibold">
                        {val.price} บาท / คน
                      </p>
                    </div>
                    <div className="mt-5 flex space-x-3">
              <Link
                className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg"
                href={`/edit/${val._id}`}
              >
                Edit
              </Link>
              <DeleteBtn course_id={val._id} />
            </div>
                  </div>
                  
                </div>
              );
            })
          ) : (
            <p className="bg-gray-500 p-3 my-3"> Not have any post yet</p>
          )}
        </div>
      </main>
    </div>
  );
}
export default Profile;
