"use client";

import { getProfile } from "@/serveraction/serverActions";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    async function fetchProfile() {
      const initialProfile = await getProfile();
      setProfile(initialProfile);
      setCourseData(initialProfile.course);
    }
    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
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
                  key={val.userid}
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
                href="/edit"
              >
                Edit
              </Link>
              <Link
                className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg"
                href="/edit"
              >
                Delete
              </Link>
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
