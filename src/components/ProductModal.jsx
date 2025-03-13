import React, { Children, useState, useEffect } from "react";
import { closeModal } from "../redux/ProductModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetMessage } from "../redux/CartSlice";

const ProductModal = ({ children }) => {
  const dispatch = useDispatch();

  const { isOpen } = useSelector((state) => state.productModal);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    console.log("Product Modal Mounted");
  });

  const handlex = () => {
    dispatch(closeModal());
    dispatch(resetMessage());
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-40">
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => {
            dispatch(closeModal());
            dispatch(resetMessage());
          }}
        ></div>

        <div className="relative bg-white md:rounded-xl shadow-2xl p-4 lg:p-8  w-full h-[100vh] lg:w-full lg:max-w-5xl lg:h-[80vh] transform transition-all duration-300 opacity-100">
          <button
            onClick={handlex}
            className="absolute top-2 right-4 lg:top-4 lg:right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <div className="flex items-center justify-between mb-4 pb-4">
            <img
              alt="RentIQ"
              src="https://dpbexlknorwqhblxxmfl.supabase.co/storage/v1/object/sign/Assets/rentiq-high-resolution-logo-transparent.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBc3NldHMvcmVudGlxLWhpZ2gtcmVzb2x1dGlvbi1sb2dvLXRyYW5zcGFyZW50LnBuZyIsImlhdCI6MTczNzQ2NTc0MSwiZXhwIjo0ODkxMDY1NzQxfQ.xuU4RhE0QuAtjicJoDLz01F9fkqJWKIndBuIEtb4Xgo&t=2025-01-21T13%3A22%3A22.166Z"
              className="h-6 w-auto"
            />
          </div>

          <div className="h-[calc(100%-4rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 lg:pr-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
