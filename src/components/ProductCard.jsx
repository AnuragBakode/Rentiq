import React from "react";
import { MapPin, CircleUser } from "lucide-react";
import { openModal } from "../redux/ProductModalSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./ProductModal";
import ProductInfo from "./ProductInfo";
import ProductModal from "./ProductModal";

const ProductCard = ({ product }) => {
  const { picture } = product;

  const dispatch = useDispatch();

  const { isOpen } = useSelector((state) => state.productModal);

  const handleRentNowBtn = () => {
    dispatch(openModal(product));
  };

  return (
    <div className="w-full p-2">
      <div className="bg-white shadow-md overflow-hidden">
        <div className="">
          <div className="relative h-36 overflow-hidden">
            <img
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              src={picture}
              alt="product-image"
            />
          </div>
        </div>

        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-base">
              ${product.price}/day
            </span>
            <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
              <CircleUser className="w-full h-full text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-gray-500 text-xs">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{product.location || "Location N/A"}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-yellow-500 animate-pulse">⭐</span>
              <span className="text-sm ml-1">{product.rating || 5}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleRentNowBtn}
        className="w-full bg-grey_dark text-white text-sm font-bold py-1.5 transition-colors"
      >
        Rent Now
      </button>
    </div>
  );
};

export default ProductCard;
