"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { enroll, cancelEnroll } from "@/serveraction/serverActions";

interface EnrollBtnProps {
  course_id: string;
  cookie: boolean;
}

const EnrollBtn: React.FC<EnrollBtnProps> = ({ course_id, cookie }) => {
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const res = await fetch(`/api/enroll/check?course_id=${course_id}`, {
          method: "GET",
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          setIsEnrolled(data.isEnrolled);
        } else {
          console.error("Failed to check enrollment status");
        }
      } catch (error) {
        console.error("Error checking enrollment status:", error);
      }
    };

    checkEnrollment();
  }, [course_id]);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300",
      cancelButton:
        "bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 mx-3",
    },
    buttonsStyling: false,
  });

  const handleEnroll = async () => {
    if (!cookie) {
      Swal.fire({
        title: "Please log in to enroll",
        icon: "warning",
      }).then(() => {
        window.location.href = "/login"; // Redirect to login page
      });
    } else {
      const result = await swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "Do you want to enroll in this course?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, enroll!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        await enroll(course_id);
        setIsEnrolled(true);
        Swal.fire("Enrolled!", "You have enrolled in the course.", "success");
      }
    }
  };

  const handleCancelEnroll = async () => {
    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Do you want to cancel your enrollment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel enrollment!",
      cancelButtonText: "No, keep enrollment!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await cancelEnroll(course_id);
      setIsEnrolled(false);
      Swal.fire(
        "Enrollment Cancelled!",
        "You have cancelled your enrollment.",
        "success"
      );
    }
  };

  if (isEnrolled === null) {
    return <button className="btn">Loading...</button>;
  }

  return isEnrolled ? (
    <button
      onClick={handleCancelEnroll}
      className="bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 transition duration-300 text-lg"
    >
      Cancel Enrollment
    </button>
    ) : (
    <button
      onClick={handleEnroll}
      className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition duration-300 text-lg"
    >
      Enroll
    </button>
  );
};

export default EnrollBtn;