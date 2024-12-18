"use client";

import Link from "next/link";
import "../globals.css";
import Image from 'next/image';
import { useState, useEffect } from "react";
import { checkCookie, deleteSession } from "@/serveraction/serverActions";
import { usePathname } from "next/navigation";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookie, setCookie] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    async function getCookie() {
      const isCookie = await checkCookie();
      if (isCookie) setCookie(true);
    }
    getCookie();
  });

  const pathname = usePathname();

  const handleLogout = async () => {
    await deleteSession(pathname);
  };

  if (!cookie) {
    return (
      <>
      <div className="flex h-full">
        <nav
          className="pl-5 pr-5 text-center rounded-e-xl bg-[#395886] text-white z-40 transition-transform duration-300 w-full md:w-auto"
         >
          <div className="flex justify-between items-center p-4">
          <h2 className="p-2  text-2xl flex justify-center items-center">
          <Image
             src="/image/icon.png" 
             alt="Icon"
            width={50} 
            height={50} 
            className="mr-2" 
          />
            Username
        </h2>
            <button className="fixed top-2 right-4 md:hidden bg-[#395886] text-white text-2xl p-4 rounded z-50 shadow-lg"
              onClick={toggleMenu}>
              ☰
            </button>
          </div>
          <div
            className={`grid gap-10 ${
              isOpen ? "block" : "hidden"
            } md:grid bg-[#395886] text-white z-40 transition-transform duration-300`}
          >
          <div className="flex flex-col gap-4 w-full h-screen">
          <Link
              href="/"
              className="w-full text-center text-lg py-2 rounded transition duration-300 flex items-center justify-center group hover:bg-white hover:text-black"
          >
              <div className="relative flex items-center justify-center mr-2">
                  <img
                      src="/image/home2.png"
                      alt="home2"
                      className="h-7 w-7 transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                      src="/image/home.png"
                      alt="home"
                      className="h-7 w-7 absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
              </div>
              <span className="transition-colors duration-300 group-hover:text-black">
                    Home
              </span>
          </Link>
          <Link
              href="/profile"
              className="w-full text-center text-lg py-2 rounded transition duration-300 flex items-center justify-center group hover:bg-white hover:text-black"
          >
              <div className="relative flex items-center justify-center mr-2">
                  <img
                      src="/image/profile2.png"
                      alt="profile2"
                      className="h-7 w-7 transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                      src="/image/profile.png"
                      alt="profile"
                      className="h-7 w-7 absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
              </div>
              <span className="transition-colors duration-300 group-hover:text-black">
                  Profile
              </span>
          </Link>
          <Link
              href="/favorite"
              className="w-full text-center text-lg py-2 rounded transition duration-300 flex items-center justify-center group hover:bg-white hover:text-black"
          >
              <div className="relative flex items-center justify-center mr-2">
                  <img
                      src="/image/Review2.png"
                      alt="Review2"
                      className="h-7 w-7 transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                      src="/image/Review.png"
                      alt="Review"
                      className="h-6 w-6 absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
              </div>
              <span className="transition-colors duration-300 group-hover:text-black">
                Review
              </span>
          </Link>
          <Link
               href="/manual"
              className="w-full text-center text-lg py-2 rounded transition duration-300 flex items-center justify-center group hover:bg-white hover:text-black"
          >
              <div className="relative flex items-center justify-center mr-2">
                  <img
                      src="/image/manual2.png"
                      alt="manual2"
                      className="h-7 w-7 transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                      src="/image/manual.png"
                      alt="manual"
                      className="h-7 w-7 absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
              </div>
              <span className="transition-colors duration-300 group-hover:text-black">
              Manual
              </span>
          </Link>
            <div className="border-t border-white my-4"></div>
  
            <Link
              href="/login"
              className="w-full text-center text-lg hover:bg-green-600 hover:text-black py-2 rounded transition duration-300"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="w-full text-center text-lg hover:bg-blue-400 hover:text-black py-2 rounded transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>
        </nav>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex h-full">
         <nav
          className="pl-5 pr-5 text-center rounded-e-xl bg-[#395886] text-white z-40 transition-transform duration-300 w-full md:w-auto"
         >
        <h2 className="p-2 mt-3 text-2xl flex justify-center items-center">
          <Image
             src="/image/icon.png" 
             alt="Icon"
            width={60} 
            height={60} 
            className="mr-2" 
          />
            Username
        </h2>
            <button className="fixed top-2 right-4 md:hidden bg-[#395886] text-white p-2 rounded z-50 shadow-lg"
              onClick={toggleMenu}>
              ☰
            </button>
          
          <div
            className={`grid gap-10 ${
              isOpen ? "block" : "hidden"
            } md:grid bg-[#395886] text-white z-40 transition-transform duration-300`}
          >
          <div className="flex flex-col gap-4 w-full h-screen">
          <Link
              href="/"
              className="w-full text-center text-lg py-2 rounded transition duration-300 flex items-center justify-center group hover:bg-white hover:text-black"
          >
              <div className="relative flex items-center justify-center mr-2">
                  <img
                      src="/image/home2.png"
                      alt="home2"
                      className="h-7 w-7 transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                      src="/image/home.png"
                      alt="home"
                      className="h-7 w-7 absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
              </div>
              <span className="transition-colors duration-300 group-hover:text-black">
                    Home
              </span>
          </Link>
          <Link
              href="/profile"
              className="w-full text-center text-lg py-2 rounded transition duration-300 flex items-center justify-center group hover:bg-white hover:text-black"
          >
              <div className="relative flex items-center justify-center mr-2">
                  <img
                      src="/image/profile2.png"
                      alt="profile2"
                      className="h-7 w-7 transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                      src="/image/profile.png"
                      alt="profile"
                      className="h-7 w-7 absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
              </div>
              <span className="transition-colors duration-300 group-hover:text-black">
                  Profile
              </span>
          </Link>
          <Link
              href="/favorite"
              className="w-full text-center text-lg py-2 rounded transition duration-300 flex items-center justify-center group hover:bg-white hover:text-black"
          >
              <div className="relative flex items-center justify-center mr-2">
                  <img
                      src="/image/Review2.png"
                      alt="Review2"
                      className="h-7 w-7 transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                      src="/image/Review.png"
                      alt="Review"
                      className="h-6 w-6 absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
              </div>
              <span className="transition-colors duration-300 group-hover:text-black">
                Review
              </span>
          </Link>
          <Link
               href="/manual"
              className="w-full text-center text-lg py-2 rounded transition duration-300 flex items-center justify-center group hover:bg-white hover:text-black"
          >
              <div className="relative flex items-center justify-center mr-2">
                  <img
                      src="/image/manual2.png"
                      alt="manual2"
                      className="h-7 w-7 transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                      src="/image/manual.png"
                      alt="manual"
                      className="h-7 w-7 absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
              </div>
              <span className="transition-colors duration-300 group-hover:text-black">
              Manual
              </span>
          </Link>
            <div className="border-t border-white my-4"></div>
              <button
                className="w-full text-center text-lg hover:bg-red-600 hover:text-black py-2 rounded transition duration-300 mb-4"
                onClick={handleLogout}
              >
                Sign Out
              </button>
          </div>
        </div>
        </nav>
        </div>
      </>
        
    );
  }
};
export default Navbar;
