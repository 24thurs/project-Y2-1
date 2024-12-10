"use client";

import { getProfile } from "@/serveraction/serverActions";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Profile() {

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      const initialProfile = await getProfile();
      setProfile(initialProfile);
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
        <p>{profile.user.username}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3 gap-5">
          <div className="shadow-xl my-10 p-5 sm:p-10 rounded-xl">
            <h4>Post Title</h4>
            {/* <Image
              src="/path/to/image.jpg"
              width={400}
              height={400}
              alt="image"
              priority
            /> */}
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
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
      </main>
    </div>
  );
};
export default Profile;
