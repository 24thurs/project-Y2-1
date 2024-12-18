"use client";

import React from "react";
import Swal from "sweetalert2";

const FavoriteBtn = ({ course_id }: { course_id: string }) => {

  const handleDelete = async () => {
    Swal.fire({
        title: "Added to Favorite",
        icon: "success"
      });
  };

  return (
    <button>
      <a
        onClick={handleDelete}
        className="bg-yellow-500 text-white px-12 py-4 rounded hover:bg-green-600 text-xl"
      >
        Favorite
      </a>
    </button>
  );
};
export default FavoriteBtn;
