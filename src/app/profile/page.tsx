"use client";

import { getProfile } from "@/serveraction/serverActions";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteBtn from "../components/DeleteBtn";
import HandleUser from "../components/HandleUser";
import Loading from "../components/Loading";


export function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [courseData, setCourseData] = useState<{ _id: string; img: string; coursename: string; teacher: string; subject: string; coursetype: string; totalmember: number; price: number; }[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const initialProfile = await getProfile();
      if (initialProfile) {
        setProfile(initialProfile);
        setCourseData(initialProfile.course || []);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);
  
  if (loading) {
    return (
      <Loading/>
    );
  }

  if (!profile) {
    return ( 
    <HandleUser/>
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
          <span className="font-bold">Name-Surname :</span> {profile.user.fullname}
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
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 ml-10 gap-8">
    {courseData && courseData.length > 0 ? (
      courseData.map((val) => (
        <div
          key={val._id}
          className="rounded-lg shadow-lg overflow-hidden bg-white"
        >
          <Image
            className="w-full h-56 object-cover"
            src={val.img}
            width={400}
            height={224}
            alt={val.coursename}
            priority
          />
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {val.coursename}
            </h3>
            <p className="text-sm text-gray-600 mb-1">Teacher: {val.teacher}</p>
            <p className="text-sm text-gray-600 mb-1">Subject: {val.subject}</p>
            <p className="text-sm text-gray-600 mb-1">Location: {val.coursetype}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-600">
                Number of members: {val.totalmember} person
              </p>
              <p className="text-lg text-green-600 font-semibold">
                {val.price} Bath / person
              </p>
            </div>
            <div className="mt-6 flex space-x-4">
              <Link
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
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
      <p className="bg-gray-500 p-3 my-3 text-white text-center">No posts yet</p>
    )}
  </div>
  <div className = "mb-4"></div>
  <div>
  <button className="bg-[#638ECB] text-xl ml-4 p-3 text-white font-bold rounded-full">
          Favortie
        </button>
  </div>
</main>
</div>
  );
}
export default Profile;

