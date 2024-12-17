"use client";

import Link from "next/link";
import "../globals.css";
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
        <nav
          className="pl-5 pr-5 text-center content-center bg-slate-400 bg-[#395886] text-white z-40 transition-transform duration-300"
          style={{
            maxHeight: "80vh",
            borderRadius: "0 0 10px 10px",
          }}
        >
          <div className="flex justify-between items-center my-4">
            <h2>Username</h2>
            <button className="md:hidden block" onClick={toggleMenu}>
              ☰
            </button>
          </div>
          <div
            className={`grid gap-10 ${
              isOpen ? "block" : "hidden"
            } md:grid bg-[#395886] text-white z-40 transition-transform duration-300`}
          >
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
                href="/signup"
                className="w-full text-center text-lg hover:bg-blue-400 hover:text-black py-2 rounded transition duration-300"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="pl-5 pr-5 text-center content-center bg-[#395886] text-white z-40 transition-transform duration-300">
          <div className="flex justify-between items-center my-4">
            <h2>Username</h2>
            <button className="md:hidden block" onClick={toggleMenu}>
              ☰
            </button>
          </div>
          <div className={`grid gap-10 ${isOpen ? "block" : "hidden"} md:grid`}>
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
              <button
                className="w-full text-center text-lg hover:bg-red-600 hover:text-black py-2 rounded transition duration-300 mb-4"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          </div>
        </nav>
      </>
    );
  }
};
export default Navbar;
