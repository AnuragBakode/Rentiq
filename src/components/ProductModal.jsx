import React, { Children, useState, useEffect } from "react";
import { closeModal } from "../redux/ProductModalSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductInfo from "./ProductInfo";

const ProductModal = ({ children }) => {
  const dispatch = useDispatch();

  const { isOpen } = useSelector((state) => state.productModal);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-40">
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => dispatch(closeModal())}
        ></div>

        <div className="relative bg-white rounded-md shadow-xl p-6 w-full max-w-5xl h-[70vh]">
          <button
            onClick={() => dispatch(closeModal())}
            className="absolute top-4 right-4 text-black font-bold text-xl"
            aria-label="Close"
          >
            ×
          </button>
          <img
            alt="Your Company"
            src="https://dpbexlknorwqhblxxmfl.supabase.co/storage/v1/object/sign/Assets/rentiq-high-resolution-logo-transparent.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBc3NldHMvcmVudGlxLWhpZ2gtcmVzb2x1dGlvbi1sb2dvLXRyYW5zcGFyZW50LnBuZyIsImlhdCI6MTczNzQ2NTc0MSwiZXhwIjo0ODkxMDY1NzQxfQ.xuU4RhE0QuAtjicJoDLz01F9fkqJWKIndBuIEtb4Xgo&t=2025-01-21T13%3A22%3A22.166Z"
            className="h-5 w-auto mb-4"
          />
          <div className="h-[95%] p-2">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
