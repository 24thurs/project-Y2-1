"use client";

import Link from "next/link";
import { postCourse } from "@/serveraction/serverActions";
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";

const CreatePage = () => {
  const [imageUrl, setImageUrl] = useState("");

  const subjectOptions = [
    { value: "math", label: "Math" },
    { value: "science", label: "Science" },
    { value: "history", label: "History" },
    { value: "english", label: "English" },
    { value: "art", label: "Art" },
    { value: "music", label: "Music" },
    { value: "physical_education", label: "Physical Education" },
    { value: "computer_science", label: "Computer Science" },
    { value: "economics", label: "Economics" },
    { value: "geography", label: "Geography" },
    { value: "literature", label: "Literature" },
    { value: "philosophy", label: "Philosophy" },
    { value: "psychology", label: "Psychology" },
    { value: "sociology", label: "Sociology" },
    { value: "other", label: "Other..." },
  ];

  const [selectedSubject, setSelectedSubject] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(subjectOptions);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedSubject(value);
    setFilteredOptions(
      subjectOptions.filter(option =>
        option.label.toLowerCase().includes(value.toLowerCase())
      )
    );
    setIsDropdownOpen(true);
  };

  const handleOptionClick = (value: string) => {
    setSelectedSubject(value);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:mr-4">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Title */}
        <div className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md inline-block mb-6">
          <h1 className="text-3xl font-bold">Create Course</h1>
        </div>

        <div className="max-w-full mx-auto bg-[#EAEFF8] shadow-lg rounded-lg p-6 flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-[350px] h-[220px] bg-gray-200 rounded-md shadow-lg mb-4 md:mb-0 md:ml-6 order-1 md:order-2">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Course Image"
                className="object-cover w-full h-full rounded-md"
                onError={() => setImageUrl("")}
              />
            ) : (
              <span className="text-gray-500 flex items-center justify-center h-full">
                350 x 220
              </span>
            )}
          </div>

          {/* Form Section */}
          <form action={postCourse} className="flex-1 space-y-4 relative order-2 md:order-1">
            {/* Image URL */}
            <label className="text-gray-700">Image URL</label>
            <input
              type="text"
              className="w-full py-2 px-4 border rounded-xl bg-white focus:bg-white focus:outline-none focus:ring-0"
              placeholder="Image URL"
              name="img"
              onChange={(e) => setImageUrl(e.target.value)}
            />


            {/* Course Name */}
            <div className="space-y-2">
              <label className="text-gray-700">Course Name</label>
              <input
                type="text"
                className="w-full py-2 px-4 border rounded-xl focus:ring-2 focus:ring-blue-400"
                placeholder="Course name"
                name="courseName"
                required
              />
            </div>

            {/* Subject Dropdown */}
            <div className="space-y-2">
              <label className="text-gray-700">Subject</label>
              <div className="relative" ref={dropdownRef}>
                <input
                  type="text"
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                  placeholder="subject . . ."
                  className="w-full py-2 px-4 border rounded-xl focus:ring-2 focus:ring-blue-400"
                  required
                  onFocus={() => setIsDropdownOpen(true)}
                />
                {isDropdownOpen && filteredOptions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 max-h-60 overflow-auto shadow-lg">
                    {filteredOptions.map(option => (
                      <li
                        key={option.value}
                        onClick={() => handleOptionClick(option.label)}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>



            <style jsx>{`
              ul {
                scrollbar-width: thin;
                scrollbar-color: #cbd5e0 #f1f5f9;
              }
              ul::-webkit-scrollbar {
                width: 8px;
              }
              ul::-webkit-scrollbar-track {
                background: #f1f5f9;
                border-radius: 4px;
              }
              ul::-webkit-scrollbar-thumb {
                background-color: #cbd5e0;
                border-radius: 4px;
                border: 2px solid #f1f5f9;
              }
            `}
            </style>

            {/* Teacher Name */}
            <div className="space-y-2">
              <label className="text-gray-700">Teacher Name</label>
              <input
                type="text"
                className="w-full py-2 px-4 border rounded-xl focus:ring-2 focus:ring-blue-400"
                placeholder="Teacher Name"
                name="teacher"
                required
              />
            </div>

            {/* Course Details */}
            <div className="space-y-2">
              <label className="text-gray-700">Course Detail</label>
              <textarea
                className="w-full h-32 py-2 px-4 border rounded-xl focus:ring-2 focus:ring-blue-400"
                placeholder="Course detail"
                name="detail"
                required
              ></textarea>
            </div>

            {/* Hours and Total Members */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-gray-700">Hours Content</label>
                <input
                  type="number"
                  className="w-full py-2 px-4 border rounded-xl focus:ring-2 focus:ring-blue-400"
                  placeholder="Hours content"
                  name="hour"
                  min="1"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700">Total Members</label>
                <input
                  type="number"
                  className="w-full py-2 px-4 border rounded-xl focus:ring-2 focus:ring-blue-400"
                  placeholder="Total members"
                  name="totalMember"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-gray-700">Price per Person</label>
              <input
                type="number"
                className="w-full py-2 px-4 border rounded-xl focus:ring-2 focus:ring-blue-400"
                placeholder="Price per person"
                name="price"
                min="0"
                required
              />
            </div>

            {/* Course Type */}
            <div className="space-y-2">
              <label className="text-gray-700">Course Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="courseType"
                    value="online"
                    className="mr-2"
                    required
                  />
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow">
                    Online
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="courseType"
                    value="onsite"
                    className="mr-2"
                  />
                  <span className="bg-yellow-500 text-white px-4 py-2 rounded-xl shadow">
                    Onsite
                  </span>
                </label>
              </div>
            </div>

            {/* Buttons Positioned Bottom-Right */}
            <div className="flex justify-end items-center mt-8">
              <Link
                href="/"
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
              >
                Back
              </Link>
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 ml-4"
              >
                Create Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;