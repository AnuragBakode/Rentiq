import React from "react";
import { User, ShoppingCart } from "lucide-react";
import PostItem from "./PostItem";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleProfileClick = (e) => {
    navigate("/profile");
  };
  const handleCartBtnClick = () => {
    dispatch(openCart());
  };

  const { productCount } = useSelector((state) => state.cart);

  return (
    <div className="">
      <nav className="text-white flex justify-between items-center">
        <div className="flex items-center">
          <img
            alt="Rentiq"
            src="https://dpbexlknorwqhblxxmfl.supabase.co/storage/v1/object/sign/Assets/rentiq-high-resolution-logo-transparent.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBc3NldHMvcmVudGlxLWhpZ2gtcmVzb2x1dGlvbi1sb2dvLXRyYW5zcGFyZW50LnBuZyIsImlhdCI6MTczNzQ2NTc0MSwiZXhwIjo0ODkxMDY1NzQxfQ.xuU4RhE0QuAtjicJoDLz01F9fkqJWKIndBuIEtb4Xgo&t=2025-01-21T13%3A22%3A22.166Z"
            className="mx-auto h-6 w-auto"
          />
        </div>
        <div className="flex">
          <div>
            <PostItem />
          </div>
          <div className="flex items-center">
            <button
              className="flex items-center border px-2 md:px-4 py-2 ml-3 rounded-full md:rounded-lg text-grey_dark text-xs font-semibold"
              onClick={handleProfileClick}
            >
              <User className="w-4 h-4 md:mr-1" />
              <p className="hidden md:block">Profile</p>
            </button>
            <div
              className="relative cursor-pointer ml-3"
              onClick={handleCartBtnClick}
            >
              {productCount > 0 && (
                <p className="absolute -top-2 -right-2 bg-rose w-5 h-5 rounded-full text-sm text-white flex justify-center">
                  {productCount}
                </p>
              )}
              <ShoppingCart className="text-grey_dark cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
