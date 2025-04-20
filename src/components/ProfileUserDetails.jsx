import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserRound, Mail, Phone } from "lucide-react";
import Logout from "./Logout";
import { Pencil } from "lucide-react";
import UpdateUserDetailsForm from "./UpdateUserDetailsForm";
import ProductModal from "./ProductModal";
import { openModal } from "../redux/ProductModalSlice";

export default function ProfileUserDetails({ user, showLogout }) {
  console.log(user);

  useEffect(() => {
    console.log("PUD re-rendered");
  }, []);

  const { isOpen } = useSelector((state) => state.productModal);

  const dispatch = useDispatch();

  const handleUpdateUserPencilClick = () => {
    dispatch(openModal());
  };

  return (
    <div className="flex items-start w-100 lg:w-[50%] xl:w-[40%] relative">
      <div className="border-2 overflow-hidden w-[90px] h-[90px] sm:w-32 sm:h-32 flex items-center justify-center border-rose rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="Preview"
            className="min-w-full min-h-full object-top scale-150"
          />
        ) : (
          <UserRound size={64} className="text-grey_dark" />
        )}
      </div>

      <div className="flex flex-col flex-1 bg-white rounded-md p-2">
        <div className="flex items-baseline justify-between ml-2 md:ml-8">
          <h2 className="text-xl md:text-2xl font-bold text-grey_dark">
            {user.name}
          </h2>
        </div>
        <div className="flex flex-col justify-between ml-2 md:ml-8">
          <div className="">
            <div className="mt-1 flex text-gray-600 bg-gray-100 rounded-lg">
              <Mail size={16} className="mr-2 text-rose" />
              <span className="text-xs">{user.email}</span>
            </div>
            <div className="mt-1 flex text-gray-600 bg-gray-100 rounded-lg">
              <Phone size={16} className="mr-2 text-rose" />
              <span className="text-xs">
                {user.contact ? user.contact : "N/A"}
              </span>
            </div>
          </div>
          <div className="mt-2 sm:mt-4">{showLogout && <Logout />}</div>
        </div>
      </div>
      {showLogout && (
        <div
          className="absolute top-2 sm:top-4 right-0 sm:right-4 cursor-pointer"
          onClick={handleUpdateUserPencilClick}
        >
          <Pencil size={18} />
        </div>
      )}

      {isOpen && <ProductModal children={<UpdateUserDetailsForm />} />}
    </div>
  );
}
