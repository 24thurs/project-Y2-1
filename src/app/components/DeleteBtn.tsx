"use client";

import React from "react";

const DeleteBtn = ({ course_id }: { course_id: string }) => {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(
        `http://localhost:3000/api/course?id=${course_id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        window.location.reload();
      }
    }
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
