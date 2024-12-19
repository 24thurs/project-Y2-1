"use client";

import React from "react";
import Swal from "sweetalert2";

const FavoriteBtn = ({ cookie }: { cookie: boolean }) => {

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
        title: "Create successfully",
        icon: "success",
      }).then(() => {
        window.location.href = "/"; // Redirect to login page
      });
    }
  };
  return (
    <button>
      <a
        onClick={handleFavorite}
        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 ml-4"
      >
        Create course
      </a>
    </button>
  );
};
export default FavoriteBtn;
