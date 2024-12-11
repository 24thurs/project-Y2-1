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
      <nav className="pl-5 pr-5 text-center content-center bg-slate-400">
        <div className="flex justify-between items-center my-4">
          <h2>Username</h2>
          <button className="md:hidden block" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <div className={`grid gap-10 ${isOpen ? "block" : "hidden"} md:grid`}>
          <div className="grid gap-4">
      
            <div className=" hover:text-blue-700 transition duration-300 ">
               <Link href="/">  Home</Link>
            </div>
            <div className=" hover:text-blue-700 transition duration-300 ">
               <Link href="/profile">Profile</Link>
            </div>
            <div className=" hover:text-blue-700 transition duration-300 ">
               <Link href="/favorite">Favorite</Link>
            </div>
            <div className=" hover:text-blue-700 transition duration-300 ">
               <Link href="/manual">Manual</Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="hover:text-blue-700 transition duration-300 ">
                <Link href="/login">Login</Link>
            </div>
            <div className="hover:text-blue-700 transition duration-300 ">
                <Link href="/register">Register</Link>
            </div>
            
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
