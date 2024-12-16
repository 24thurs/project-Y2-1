"use client";
import { useState,useEffect } from "react";
import Link from "next/link";
// import { useRouter } from "next/router";

const CreatePage = () => {
  const [image, setImage] = useState(null); 
  const [courseName, setCourseName] = useState(""); 
  const [courseDetail, setCourseDetail] = useState(""); 
  const [subject, setSubject] = useState(""); 
  const [teacher, setTeacher] = useState(""); 
  const [hoursContent, setHoursContent] = useState(""); 
  const [totalOfCourse, setTotalOfCourse] = useState(""); 
  const [price, setPrice] = useState(""); 
  const [courseType, setCourseType] = useState(""); 
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate the form data before submission
    if (!courseName || !courseDetail || !subject || !teacher || !hoursContent || !totalOfCourse || !price || !courseType) {
      alert("Please fill out all fields.");
      return;
    }
    // Log the form data or submit to an API here
    console.log({
      courseName,
      subject,
      teacher,
      hoursContent,
      totalOfCourse,
      price,
      courseType,
      image,
    });
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div style={{ backgroundColor: "#EAEFF8", minHeight: "100vh" }}>
      <div className="container mx-auto py-10 px-5">
        <div className="flex items-center justify-center w-full max-w-[270px] h-[70px] border-4 border-blue-400 bg-blue-400 p-6 rounded-md">
          <h3 className="text-3xl font-bold">Create Course</h3>
        </div>
  
        <hr className="my-3" />
  
        <form action="" className="grid w-full max-w-[800px]">
          <div className="flex flex-col border-4 border-blue-100 bg-blue-100 p-6 rounded-md">
            <div className="w-full my-2">
              <label htmlFor="postImage" className="block text-lg mb-2">
                Post Image
              </label>
              <input
                type="file"
                id="postImage"
                accept="image/*"
                className="w-full bg-gray-200 py-2 px-3 rounded text-lg"
                onChange={handleImageUpload}
                required 
              />
            </div>
            {image && (
              <div className="my-4">
                <img
                  src={image}
                  alt="Uploaded Preview"
                  className="w-full h-auto max-h-[400px] object-cover rounded-md"
                />
              </div>
            )}
  
            <div className="flex flex-col my-2">
              <label className="block text-lg mb-2">Course name</label>
              <input
                type="text"
                className="w-[300px] bg-gray-200 py-2 px-3 rounded text-lg"
                placeholder="Enter Course name"
                required
              />
            </div>
  
            <div className="flex flex-col my-2">
              <label htmlFor="subject" className="block text-lg mb-2">Subject</label>
              <select
                id="subject"
                className="w-full bg-gray-200 py-2 px-3 rounded text-lg"
                required 
              >
                <option value="">Select a subject</option>
                <option value="physics">ฟิสิกส์</option>
                <option value="chemistry">เคมี</option>
                <option value="biology">ชีวะ</option>
              </select>
            </div>
  
            <div className="flex flex-col my-2">
              <label htmlFor="Teacher" className="block text-lg mb-2">Teacher Name</label>
              <select
                id="teacher"
                className="w-[400px] bg-gray-200 py-2 px-3 rounded text-lg"
                required 
              >
                <option value="">Select a Teacher</option>
                <option value="teacher1">อาจารย์แก๊ส</option>
                <option value="teacher2">อาจารย์ชูเกียรติ</option>
                <option value="teacher3">อาจารย์ศุวิล</option>
              </select>
            </div>
  
            <div className="flex flex-col my-2">
              <label htmlFor="hoursContent" className="block text-lg mb-2">Hours Content</label>
              <input
                id="hoursContent"
                type="number"
                className="w-[150px] bg-gray-200 py-2 px-3 rounded text-lg"
                placeholder="Enter hours"
                min="1"
                required 
              />
            </div>
  
            <div className="flex space-x-9 my-2">
              <div className="flex flex-col w-[48%]">
                <label htmlFor="totalOfCourse" className="block text-lg mb-2">Total of Course</label>
                <input
                  id="totalOfCourse"
                  type="number"
                  className="w-[270px] bg-gray-200 py-2 px-3 rounded text-lg"
                  placeholder="Enter total students of course"
                  min="2"
                  required 
                />
              </div>
              <div className="flex flex-col w-[48%]">
                <label htmlFor="price" className="block text-lg mb-2">Price</label>
                <input
                  id="price"
                  type="number"
                  className="w-[200px] bg-gray-200 py-2 px-3 rounded text-lg"
                  placeholder="Enter price per person"
                  min="0"
                  required
                />
              </div>
            </div>
            
            <div className="flex space-x-4 my-4">
            <label htmlFor="price" className="block text-lg mb-2">Location</label>
              <div className="flex items-center">
                <input
                  id="online"
                  type="radio"
                  name="courseType"
                  value="online"
                  className="mr-2"
                  required 
                />
                <label htmlFor="online" className="text-lg">Online</label>
              </div>
              <div className="flex items-center">
                <input
                  id="onsite"
                  type="radio"
                  name="courseType"
                  value="onsite"
                  className="mr-2"
                  required 
                />
                <label htmlFor="onsite" className="text-lg">Onsite</label>
              </div>
            </div>
  
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="w-[150px] bg-green-500 text-black py-2 px-3 rounded-md text-lg"
              >
                Create Course
              </button>
              <Link
                href="/"
                className="w-[60px] bg-gray-400 inline-block py-2 px-3 rounded-md text-lg"
              >
                Back
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );  
  
};
export default CreatePage;

