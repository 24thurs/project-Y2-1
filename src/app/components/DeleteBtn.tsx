"use client";

import React from "react";
import Swal from "sweetalert2";


const DeleteBtn = ({ course_id }: { course_id: string }) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300",
      cancelButton: "bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 mx-3"
    },
    buttonsStyling: false
  });

  const handleDelete = async () => {
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `http://localhost:3000/api/course?id=${course_id}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then(() => {
            window.location.reload();
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your course is safe :)",
          icon: "error"
        });
      }
    });
  };

  return (
    <button>
      <a
        onClick={handleDelete}
        className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg"
      >
        Delete
      </a>
    </button>
  );
};
export default DeleteBtn;
