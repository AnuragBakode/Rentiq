import React from "react";
import { MapPin, CircleUser } from "lucide-react";
import { openModal } from "../redux/ProductModalSlice";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const { picture } = product;

  const dispatch = useDispatch();

  const handleRentNowBtn = () => {
    console.log("Rent Now clicked");

    dispatch(openModal(product));
  };

  return (
    <div className="w-full p-2">
      <div className="bg-white shadow-md overflow-hidden rounded-lg">
        <div
          className="relative h-32 md:h-36 overflow-hidden cursor-pointer"
          onClick={handleRentNowBtn}
        >
          <img
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            src={picture}
            alt="product-image"
          />
        </div>

        <div className="px-2 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-sm">${product.price}/day</span>
            <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden">
              <CircleUser className="w-full h-full text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center text-gray-500 text-xs">
              <MapPin className="w-3 h-3 mr-1" />
              <span className="text-xs">
                {product.location || "Location N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-yellow-500 animate-pulse">⭐</span>
              <span className="text-sm ml-1">{product.rating || 5}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
