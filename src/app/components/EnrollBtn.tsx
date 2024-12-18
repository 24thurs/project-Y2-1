"use client";

import React from "react";
import Swal from "sweetalert2";

const EnrollBtn = ({ course_id }: { course_id: string }) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300",
      cancelButton:
        "bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 mx-3",
    },
    buttonsStyling: false,
  });

  const handleDelete = async () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, enroll the course!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        swalWithBootstrapButtons
          .fire({
            title: "Success!",
            text: "Your have enrolled this course.",
            icon: "success",
          })
          .then(() => {
            window.location.reload();
          });
        if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your have cancelled to enroll :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <button>
      <a
        onClick={handleDelete}
        className="bg-green-500 text-white px-12 py-4 rounded hover:bg-green-600 text-xl"
      >
        Enroll
      </a>
    </button>
  );
};
export default EnrollBtn;
