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
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/favorite">Favorite</Link>
            <Link href="/manual">Manual</Link>
          </div>

          <div className="grid gap-4">
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
