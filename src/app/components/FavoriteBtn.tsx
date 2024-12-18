"use client";

import React from "react";
import Swal from "sweetalert2";

const FavoriteBtn = ({ course_id, cookie }: { course_id: string; cookie: boolean }) => {

  const handleFavorite = async () => {
    if (!cookie) {
      Swal.fire({
        title: "Please log in to add to favorites",
        icon: "warning",
      }).then(() => {
        window.location.href = "/login"; // Redirect to login page
      });
    } else {
      Swal.fire({
        title: "Added to Favorite",
        icon: "success",
      });
    }
  };

  return (
    <button>
      <a
        onClick={handleFavorite}
        className="bg-yellow-500 text-white px-12 py-4 rounded hover:bg-green-600 text-xl"
      >
        Favorite
      </a>
    </button>
  );
};
export default FavoriteBtn;
