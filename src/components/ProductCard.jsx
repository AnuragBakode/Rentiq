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
    <div className="w-56 flex flex-col gap-2 m-2">
      <div
        className="cursor-pointer group relative flex flex-col bg-white shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded-lg overflow-hidden"
        onClick={handleRentNowBtn}
      >
        <div className="absolute top-3 left-3 z-10">
          <CircleUser className="w-6 h-6 text-white drop-shadow-lg" />
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span className="text-xs font-medium text-white bg-rose/70 px-1.5 py-0.5 rounded backdrop-blur-sm">
            ${product.price}/day
          </span>
        </div>
        <div className="relative h-36 overflow-hidden">
          <img
            className="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110 w-full h-full object-cover"
            src={picture}
            alt="product-image"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
