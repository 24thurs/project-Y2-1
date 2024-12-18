"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { getCourse } from "@/serveraction/serverActions";

function Home() {
  interface Course {
    _id: string;
    img: string;
    coursename: string;
    teacher: string;
    subject: string;
    coursetype: string;
    totalmember: number;
    price: number;
  }

  const [courseData, setCourseData] = useState<Course[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      const courses = await getCourse();
      setCourseData(courses || []);
    }

    fetchCourses();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [status, setStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleFilter = () => {
    const finalMinPrice = minPrice || "ไม่จำกัด";
    const finalMaxPrice = maxPrice || "ไม่จำกัด";
    console.log("price:", finalMinPrice, "-", finalMaxPrice);
    console.log("status:", status || "ไม่ระบุ");
    console.log("sortorder:", sortOrder || "ไม่ระบุ");
    setIsOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setIsSearching(false);
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?query=${searchTerm}`);
      const data = await response.json();
      setResults(data);

      if (response.ok) {
        console.log(results);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      handleSearch();
    }
  }, [searchTerm]);

  return (
    <div style={{ backgroundColor: "#EAEFF8", minHeight: "100vh" }}>
      <div className="flex flex-col md:flex-row">
        <div className="md:mr-4">
          <Navbar />
        </div>
        <main className="container mx-auto my-6 px-4">
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="ค้นหา..."
              className="w-full max-w-xl p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-r-lg hover:bg-red-600 transition duration-300"
                onClick={() => setSearchTerm("")}
              >
                Clear
              </button>
            )}
            <button
              className="bg-[#6699FF] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ml-2"
              onClick={handleSearch}
            >
              ค้นหา
            </button>
          </div>

          <div className="container mx-auto">
            <div className="flex justify-center my-10">
              <button className="bg-[#6699FF] text-xl text-white font-bold py-2 px-4 rounded-full">
                Choose Subject
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-5 flex-wrap max-w-screen-md mx-auto">
              <button className="bg-[#83AEEC] hover:bg-gray-300 text-gray-800 font-bold py-6 px-4 rounded-lg transition duration-300 ease-in-out">
                  <div className="flex flex-col items-center">
                     <img 
                     src="/image/English.png"
                     alt="Englsih" 
                     className="w-20" />
                     <p className="text-lg mt-2">English</p>
                  </div>
              </button>
              <button className="bg-[#83AEEC] hover:bg-gray-300 text-gray-800 font-bold py-6 px-4 rounded-lg transition duration-300 ease-in-out">
                  <div className="flex flex-col items-center">
                  <img 
                     src="/image/Math.png"
                     alt="Math" 
                     className="w-20" />
                     <p className="text-lg mt-2">Math</p>
                  </div>
              </button>
              <button className="bg-[#83AEEC] hover:bg-gray-300 text-gray-800 font-bold py-6 px-4 rounded-lg transition duration-300 ease-in-out">
                  <div className="flex flex-col items-center">
                  <img 
                     src="/image/Computer.png"
                     alt="Computer" 
                     className="w-20" />
                     <p className="text-lg mt-2">Computer</p>
                  </div>
              </button>
              <button className="bg-[#83AEEC] hover:bg-gray-300 text-gray-800 font-bold py-6 px-4 rounded-lg transition duration-300 ease-in-out">
                  <div className="flex flex-col items-center">
                  <img 
                     src="/image/History.png"
                     alt="History" 
                     className="w-20" />
                     <p className="text-lg mt-2">History</p>
                  </div>
              </button>
              <button className="bg-[#83AEEC] hover:bg-gray-300 text-gray-800 font-bold py-6 px-4 rounded-lg transition duration-300 ease-in-out">
                  <div className="flex flex-col items-center">
                  <img 
                     src="/image/Science.png"
                     alt="Science" 
                     className="w-20" />
                     <p className="text-lg mt-2">Science</p>
                  </div>
              </button>
              </div>

          <hr className="my-3" />
          <button className="bg-[#6699FF] text-xl p-3 text-white font-bold rounded-full">
            Class Subject
          </button>
          <div className="flex justify-end items-center my-8 space-x-4  ">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md text-lg hover:bg-green-600">
              <Link href="/create">Create Course</Link>
            </button>
            <div className="relative">
        <button
            onClick={toggleDropdown}
            className="flex items-center bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 z-20"
        >
            <span>SearchOrder</span>
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
        </svg>
        </button>
       {isOpen && (
      <div className="absolute right-0 top-14 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Price</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 p-1 border rounded"
                placeholder="Min"
              />
            <span>-</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 p-1 border rounded"
                placeholder="Max"
              />
            </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Status</label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={status === "Full"}
                onChange={() => setStatus(status === "Full" ? "" : "Full")}
              />
                <span>Full</span>
          </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={status === "available"}
                onChange={() => setStatus(status === "available" ? "" : "available")}
              />
            <span>Available</span>
            </label>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">SortOrder</label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="sort"
              checked={sortOrder === "low-to-high"}
              onChange={() => setSortOrder("low-to-high")}
            />
            <span>Price of Course Min - Max</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="sort"
              checked={sortOrder === "high-to-low"}
              onChange={() => setSortOrder("high-to-low")}
            />
            <span>Price of Course Max - Min</span>
          </label>
        </div>

        <button
          onClick={handleFilter}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Summit
        </button>
      </div>
      )}
      </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!isSearching && courseData && courseData.length > 0
              ? courseData.map((val) => {
                  return (
                    <Link href={`/coursedetail/${val._id}`} key={val._id}>
                      <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                        <Image
                          className="w-full h-48 object-cover"
                          src={val.img}
                          width={100}
                          height={100}
                          alt={val.coursename}
                          priority
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-bold text-gray-800">
                            {val.coursename}
                          </h3>
                          <div className="flex justify-2 items-center text-m space-x-2">
                            <p className="text-sm text-gray-500">
                              Teacher: {val.teacher}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500">
                            Subject: {val.subject}
                          </p>
                          <p className="text-sm text-gray-500">
                            Location: {val.coursetype}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-gray-500">
                              required: {val.totalmember} person
                            </p>
                            <p className="text-lg text-green-600 font-semibold">
                              {val.price} Baht / person
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              : !isSearching && (
                  <p className="bg-gray-500 p-3 my-3">
                    {" "}
                    No course available yet
                  </p>
                )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isSearching && results.length > 0
              ? results.map(
                  (result) =>
                    result && (
                      <Link
                        href={`/coursedetail/${result._id}`}
                        key={result._id}
                      >
                        <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                          <Image
                            className="w-full h-48 object-cover"
                            src={result.img}
                            width={100}
                            height={100}
                            alt={result.coursename}
                            priority
                          />
                          <div className="p-4">
                            <h3 className="text-xl font-bold text-gray-800">
                              {result.coursename}
                            </h3>
                            <div className="flex justify-2 items-center text-m space-x-2">
                              <p className="text-sm text-gray-500">
                                Teacher: {result.teacher}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">
                              Subject: {result.subject}
                            </p>
                            <p className="text-sm text-gray-500">
                              Location: {result.coursetype}
                            </p>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-sm text-gray-500">
                                required: {result.totalmember} person
                              </p>
                              <p className="text-lg text-green-600 font-semibold">
                                {result.price} Baht / person
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                )
              : isSearching && (
                  <p className="bg-gray-500 p-3 my-3">No results found</p>
                )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
