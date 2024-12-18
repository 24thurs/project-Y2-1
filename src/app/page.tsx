"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { getCourse } from "@/serveraction/serverActions";
import Loading from "./components/Loading";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      setIsLoading(true);
      const courses = await getCourse();
      setCourseData(courses || []);
      setIsLoading(false);
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
    const finalMinPrice = minPrice || "unlimit";
    const finalMaxPrice = maxPrice || "unlimit";
    console.log("price:", finalMinPrice, "-", finalMaxPrice);
    console.log("status:", status || "undefine");
    console.log("sortorder:", sortOrder || "undefine");
    setIsOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Course[]>([]);

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
    handleSearch();
  }, [searchTerm]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [coursesPerSlide, setCoursesPerSlide] = useState(3); // Default

  const subjects = [
    { id: 1, title: "English", image: "/image/English.png" },
    { id: 2, title: "Math", image: "/image/Math.png" },
    { id: 3, title: "Computer", image: "/image/Computer.png" },
    { id: 4, title: "History", image: "/image/History.png" },
    { id: 5, title: "Science", image: "/image/Science.png" },
  ];

  // Calculate the number of courses per slide based on screen size
  useEffect(() => {
    const updateCoursesPerSlide = () => {
      const width = window.innerWidth;
      if (width >= 1280) setCoursesPerSlide(5); // Large screen
      else if (width >= 1100) setCoursesPerSlide(4); // Medium-large screen
      else if (width >= 768) setCoursesPerSlide(3); // Medium screen
      else setCoursesPerSlide(2); // Mobile
    };

    updateCoursesPerSlide();
    window.addEventListener("resize", updateCoursesPerSlide);

    return () => window.removeEventListener("resize", updateCoursesPerSlide);
  }, []);

  const totalSlides = Math.ceil(subjects.length / coursesPerSlide);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1 < totalSlides ? prev + 1 : prev));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  return (
    <div style={{ backgroundColor: "#EAEFF8", minHeight: "100vh" }}>
      <div className="flex flex-col md:flex-row">
        <Navbar />

        <main className="container mx-auto my-8 px-4">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="flex justify-center items-center w-full pl-1">
                <div className="bg-white rounded-lg shadow-md p-4 relative w-full max-w-4xl flex">
                  <input
                    type="text"
                    placeholder="search..."
                    className="flex-grow border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />{" "}
                    {searchTerm && (
                    <button
                      className="absolute inset-y-0 pr-3 right-25 flex items-center text-sm leading-5"
                      onClick={() => setSearchTerm("")}
                    >
                      ✕
                    </button>
                    )}
                  <button
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="container mx-auto">
                <div className="flex justify-center my-10">
                  <button className="bg-[#6699FF] text-xl text-white font-bold py-2 px-4 rounded-full">
                    Choose Subject
                  </button>
                </div>
              </div>
              {/* Subject Carousel */}
              <div className="relative mb-8 w-full max-w-4xl mx-auto">
                {/* Left Navigation */}
                {currentSlide > 0 && (
                  <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#EAEFF8] text-black px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
                    onClick={handlePrevSlide}
                  >
                    ←
                  </button>
                )}

                <div className="flex overflow-hidden space-x-4 mx-12 px-5 py-4 justify-center">
                  {subjects
                    .slice(
                      currentSlide * coursesPerSlide,
                      (currentSlide + 1) * coursesPerSlide
                    )
                    .map((subject) => (
                      <button
                        key={subject.id}
                        className="bg-[#83AEEC] hover:bg-gray-300 text-gray-800 font-bold py-6 px-4 rounded-lg transition duration-300 ease-in-out w-40 h-40"
                        onClick={async () => {
                          setIsSearching(true);
                          setSearchTerm(subject.title);
                          try {
                            const response = await fetch(
                              `/api/search?query=${subject.title}`
                            );
                            const data = await response.json();
                            setResults(data);
                            if (response.ok) {
                              console.log(data);
                            }
                          } catch (error) {
                            console.error(
                              "Error fetching search results:",
                              error
                            );
                          }
                        }}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <img
                            src={subject.image}
                            alt={subject.title}
                            className="w-20"
                          />
                          <p className="text-lg mt-2">{subject.title}</p>
                        </div>
                      </button>
                    ))}
                </div>

                {/* Right Navigation */}
                {currentSlide < totalSlides - 1 && (
                  <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#EAEFF8] text-black px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
                    onClick={handleNextSlide}
                  >
                    →
                  </button>
                )}
              </div>

              <hr className="my-3" />
              <button className="bg-[#6699FF] text-xl p-3 text-white font-bold rounded-full">
                Class Subject
              </button>
              <div className="flex justify-end items-center my-8 space-x-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md text-lg hover:bg-green-600">
                  <Link href="/create">Create Course</Link>
                </button>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 z-20"
                  >
                    <span className="text-xl">Filter</span>
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
                        <label className="block font-semibold mb-2">
                          Price
                        </label>
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
                        <label className="block font-semibold mb-2">
                          Status
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={status === "Full"}
                            onChange={() =>
                              setStatus(status === "Full" ? "" : "Full")
                            }
                          />
                          <span>Full</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={status === "available"}
                            onChange={() =>
                              setStatus(
                                status === "available" ? "" : "available"
                              )
                            }
                          />
                          <span>Available</span>
                        </label>
                      </div>

                      <div className="mb-4">
                        <label className="block font-semibold mb-2">
                          SortOrder
                        </label>
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
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;
