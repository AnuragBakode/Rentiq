import React from "react";
import { User, ShoppingCart } from "lucide-react";
import PostItem from "./PostItem";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../redux/CartSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const handleProfileClick = (e) => {
    console.log(e);
  };
  const handleCartBtnClick = () => {
    dispatch(openCart());
  };

  const { productCount } = useSelector((state) => state.cart);

  return (
    <>
      <nav className="text-white flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            alt="Rentiq"
            src="https://dpbexlknorwqhblxxmfl.supabase.co/storage/v1/object/sign/Assets/rentiq-high-resolution-logo-transparent.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBc3NldHMvcmVudGlxLWhpZ2gtcmVzb2x1dGlvbi1sb2dvLXRyYW5zcGFyZW50LnBuZyIsImlhdCI6MTczNzQ2NTc0MSwiZXhwIjo0ODkxMDY1NzQxfQ.xuU4RhE0QuAtjicJoDLz01F9fkqJWKIndBuIEtb4Xgo&t=2025-01-21T13%3A22%3A22.166Z"
            className="mx-auto h-10 w-auto"
          />
        </div>
        <div className="flex items-center space-x-4">
          <PostItem />
          <button
            className="flex items-center border px-4 py-2 rounded-lg text-green hover:bg-blue/90"
            onClick={handleProfileClick}
          >
            <User className="w-5 h-5 mr-2" />
            Profile
          </button>
          <div className="relative cursor-pointer" onClick={handleCartBtnClick}>
            {productCount > 0 && (
              <p className="absolute -top-2 -right-2 bg-rose w-5 h-5 rounded-full text-sm text-white flex justify-center">
                {productCount}
              </p>
            )}
            <ShoppingCart className="text-green cursor-pointer" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
