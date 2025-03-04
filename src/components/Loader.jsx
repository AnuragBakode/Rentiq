import React, { useEffect } from "react";

const Loader = () => {
  useEffect(() => {
    // Disable all interactions on mount
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";

    // Re-enable interactions on unmount
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.pointerEvents = "auto";
    };
  }, []);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-white bg-opacity-80 z-50 text-black pointer-events-auto">
      <div className="flex justify-center items-center mt-80">
        <span className="text-3xl mr-4">Loading</span>
        <svg
          className="animate-spin h-8 w-8 text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Loader;
