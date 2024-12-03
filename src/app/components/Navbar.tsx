"use client";

import Link from "next/link";
import "../globals.css";
import { useState, useEffect } from "react";
import { checkCookie } from "@/serveraction/serverActions";

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

  if (!cookie) {
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
              <Link href="/signup">Register</Link>
            </div>
          </div>
        </nav>
      </>
    );
  } else {
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
              <Link href="/login">Sign Out</Link>
            </div>
          </div>
        </nav>
      </>
    );
  }
};
export default Navbar;
