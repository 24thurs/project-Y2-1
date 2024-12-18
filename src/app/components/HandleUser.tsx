"use client"

import Image from "next/image"
import Link from "next/link"

const HandleUser = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#EAEFF8] min-h-screen">
      <div className="bg-gray-300 w-full max-w-md p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-4">
          <Image
            src="/image/icon.png" 
            alt="access denied"
            width={300}
            height={300}
          />
        </div>

        <h2 className="text-xl font-bold text-black mb-2">
         This page cannot be accessed
        </h2>
        <p className="text-black mb-6">Please log in before using</p>

        <div className="flex justify-center space-x-4 mb-4">
          <Link href="/login">
            <button className="bg-blue-500 text-white w-[100px] h-[40px] text-xl rounded-md hover:bg-blue-600 transition">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-blue-400 text-white w-[100px] h-[40px] text-xl rounded-md hover:bg-blue-600 transition">
              Sign up
            </button>
          </Link>
        </div>
        <Link href="/">
          <button className="bg-gray-400 text-white w-[100px] h-[40px] text-xl rounded-md hover:bg-gray-600 transition">
            Back
          </button>
        </Link>
      </div>
      </div>
  )
}
export default HandleUser