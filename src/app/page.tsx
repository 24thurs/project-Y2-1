"use client";

import Search from "./components/Search";
import Link from "next/link";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";

function Home() {
  //JavaScript
  const [postData, setPostData] = useState([]);

  return (
    <div style={{ backgroundColor: "#EAEFF8", minHeight: "100vh" }}>
    <div className="flex flex-col md:flex-row">
      <div className="md:mr-4">
        <Navbar/>
      </div>
      <main className="container mx-auto my-6 px-4">
       <div className="flex justify-center items-center">
            <input 
                  type="text" 
                  placeholder="ค้นหา..." 
                  className="w-full max-w-xl p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
        <button className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300">
           ค้นหา
        </button>
       </div>
       

        <div className="container mx-auto">
          <div className="flex justify-center my-10">
            <button className="bg-[#638ECB] text-white font-bold py-2 px-4 rounded-full">
               Choose Subject
            </button>
            </div>
         </div>
               <div className="flex justify-center gap-5 flex-wrap max-w-screen-md mx-auto">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-6 px-4 rounded-lg transition duration-300 ease-in-out">
                  <div className="flex flex-col items-center">
                     <img src="https://i.imgur.com/O72V95X.png" alt="ภาษา" className="w-12" />
                     <p className="text-lg mt-2">ภาษาต่างประเทศ</p>
                  </div>
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-6 px-4 rounded-lg transition duration-300 ease-in-out">
                  <div className="flex flex-col items-center">
                     <img src="https://i.imgur.com/O72V95X.png" alt="ภาษา" className="w-12" />
                     <p className="text-lg mt-2">คณิตศาสตร์</p>
                  </div>
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-6 px-4 rounded-lg transition duration-300 ease-in-out">
                  <div className="flex flex-col items-center">
                     <img src="https://i.imgur.com/O72V95X.png" alt="ภาษา" className="w-12" />
                     <p className="text-lg mt-2">วิทยาศาสตร์</p>
                  </div>
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-6 px-4 rounded-lg transition duration-300 ease-in-out">
                  <div className="flex flex-col items-center">
                     <img src="https://i.imgur.com/O72V95X.png" alt="ภาษา" className="w-12" />
                     <p className="text-lg mt-2">ภาษาไทย</p>
                  </div>
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-6 px-4 rounded-lg transition duration-300 ease-in-out">
                  <div className="flex flex-col items-center">
                     <img src="https://i.imgur.com/O72V95X.png" alt="ภาษา" className="w-12" />
                     <p className="text-lg mt-2">โปรแกรมมิ่ง</p>
                  </div>
              </button>
              </div>

            
        <hr className="my-3" />
        <button className="bg-green-500 p-3">
          <Link href={"/create"}>Create Subject</Link>
        </button>
        <div className="shadow-xl my-10 p-10 rounded-xl">
          <Image
            src="/path/to/image.jpg"
            width={400}
            height={400}
            alt="image"
            priority
          />
        </div>
      </main>
    </div>
   </div>
  );
}

export default Home;
