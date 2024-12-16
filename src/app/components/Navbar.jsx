"use client";

import Link from "next/link";
import "../globals.css";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

 
  return (
    <>
      <button
        className="fixed top-4 left-4 md:hidden bg-[#395886] text-white p-2 rounded z-50 shadow-lg"
        onClick={toggleMenu}
      >
        ☰
      </button>
      <nav
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 bg-[#395886] text-white z-40 transition-transform duration-300 md:static md:sticky md:top-0 md:z-50 md:w-48 md:h-auto md:translate-x-0 w-full`} 
        style={{
          maxHeight: "80vh", 
          borderRadius: "0 0 10px 10px",
        }}
      >
        <div className="flex flex-col items-center p-4">
          <h2 className="text-2xl font-bold mb-6">Username</h2>
          <div className="flex flex-col gap-4 w-full">
            <Link
              href="/"
              className="w-full text-center text-lg hover:bg-white hover:text-black py-2 rounded transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/profile"
              className="w-full text-center text-lg hover:bg-white hover:text-black py-2 rounded transition duration-300"
            >
              Profile
            </Link>
            <Link
              href="/favorite"
              className="w-full text-center text-lg hover:bg-white hover:text-black py-2 rounded transition duration-300"
            >
              Favorite
            </Link>
            <Link
              href="/manual"
              className="w-full text-center text-lg hover:bg-white hover:text-black py-2 rounded transition duration-300"
            >
              Manual
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
    </>
  );
  
  
};
export default Navbar;
