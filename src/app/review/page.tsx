"use client";

import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

type Course = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

const ratingCriteria: string[] = [
  "ความชัดเจนของเนื้อหาที่สอน",
  "คุณภาพการสอนของผู้สอน",
  "ความเหมาะสมของเนื้อหากับระดับความรู้",
  "ความคุ้มค่าของคอร์สเมื่อเทียบกับราคา",
  "ระดับความพึงพอใจโดยรวม",
];

const courses: Course[] = [
  { id: 1, title: "คณิตศาสตร์พื้นฐาน", description: "วิชาคณิตศาสตร์ เพื่อเตรียมต่อปริญญา", price: 300, image: "/images/math-course.jpg" },
  { id: 2, title: "สอนพูดภาษาอังกฤษเบื้องต้น", description: "พูดภาษาอังกฤษอย่างมั่นใจได้ภายในหลักสูตร", price: 1000, image: "/images/english-course.jpg" },
  { id: 3, title: "เขียนโปรแกรม Python เบื้องต้น", description: "การเขียนโปรแกรมที่เข้าใจง่ายและได้ผลจริง", price: 500, image: "/images/python-course.jpg" },
  { id: 4, title: "การพัฒนาเว็บ", description: "เรียนรู้การสร้างเว็บแบบมืออาชีพ", price: 800, image: "/images/web-dev-course.jpg" },
  { id: 5, title: "การบริหารเวลา", description: "จัดการเวลาให้มีประสิทธิภาพ", price: 200, image: "/images/time-management.jpg" },
  { id: 6, title: "สอนพูดภาษาอังกฤษเบื้องต้น", description: "พูดภาษาอังกฤษอย่างมั่นใจได้ภายในหลักสูตร", price: 1000, image: "/images/english-course.jpg" },
];

const ReviewPage = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [ratings, setRatings] = useState<{ [courseId: number]: { [criterion: number]: number } }>({});
  const [reviewDetails, setReviewDetails] = useState<string>("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [coursesPerSlide, setCoursesPerSlide] = useState(3); // Default

  // คำนวณจำนวน coursesPerSlide ตามขนาดหน้าจอ
  useEffect(() => {
    const updateCoursesPerSlide = () => {
      const width = window.innerWidth;
      if (width >= 1280) setCoursesPerSlide(4); // หน้าจอใหญ่
      else if (width >= 768) setCoursesPerSlide(3); // หน้าจอกลาง
      else if (width >= 640) setCoursesPerSlide(2); // หน้าจอเล็ก
      else setCoursesPerSlide(1); // มือถือ
    };

    updateCoursesPerSlide();
    window.addEventListener("resize", updateCoursesPerSlide);

    return () => window.removeEventListener("resize", updateCoursesPerSlide);
  }, []);

  const totalSlides = Math.ceil(courses.length / coursesPerSlide);

  const handleCourseSelect = (courseId: number) => {
    setSelectedCourseId(courseId);
    setReviewDetails("");
  };

  const handleRating = (courseId: number, criterionIndex: number, rating: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [courseId]: {
        ...prevRatings[courseId],
        [criterionIndex]: rating,
      },
    }));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1 < totalSlides ? prev + 1 : prev));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="md:mr-4">
        <Navbar />
      </div>

      <main className="flex-1 p-8 bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">
          รีวิวคอร์สเรียนและผู้สอน
        </h2>

        {/* Course Carousel */}
        <div className="relative mb-8">
          {/* Left Navigation */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
            onClick={handlePrevSlide}
            disabled={currentSlide === 0}
          >
            ←
          </button>

          <div className="flex overflow-hidden space-x-4 mx-12 px-5 py-4">
            {courses
              .slice(currentSlide * coursesPerSlide, (currentSlide + 1) * coursesPerSlide)
              .map((course) => (
                <div
                  key={course.id}
                  className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-gray-100 shadow-lg rounded-lg p-4 hover:scale-105 transform transition-transform ${selectedCourseId === course.id ? "border-4 border-green-500" : ""}`}
                  onClick={() => handleCourseSelect(course.id)}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <div className="text-center mt-4">
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="text-gray-500">{course.description}</p>
                    <p className="text-green-600 mt-2 font-bold">{course.price} บาท / คน</p>
                  </div>
                </div>
              ))}
          </div>

          {/* Right Navigation */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
            onClick={handleNextSlide}
            disabled={currentSlide === totalSlides - 1}
          >
            →
          </button>
        </div>

        {/* Review Section */}
        {selectedCourseId && (
          <div className="bg-green-50 p-6 rounded-md">
            <h3 className="text-lg font-bold text-center mb-4">
              ประเมินผู้สอนและรายวิชา
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {ratingCriteria.map((criterion, index) => (
                <div key={index}>
                  <label className="block mb-2 font-medium">{criterion}</label>
                  <div className="flex space-x-4">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRating(selectedCourseId, index, rating)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${ratings[selectedCourseId]?.[index] === rating
                            ? "bg-green-600 text-white"
                            : "bg-gray-300 text-gray-600"
                          }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block mb-2 font-medium">รายละเอียดเพิ่มเติม</label>
              <textarea
                className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-green-500"
                rows={4}
                placeholder="เขียนความคิดเห็นเพิ่มเติมเกี่ยวกับคอร์สนี้..."
                value={reviewDetails}
                onChange={(e) => setReviewDetails(e.target.value)}
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">
                ยกเลิก
              </button>
              <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
                ยืนยัน
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReviewPage;
