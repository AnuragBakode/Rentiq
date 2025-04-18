import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserRound, Mail, Phone } from "lucide-react";
import Logout from "./Logout";
import { Pencil } from "lucide-react";
import UpdateUserDetailsForm from "./UpdateUserDetailsForm";
import ProductModal from "./ProductModal";
import { openModal } from "../redux/ProductModalSlice";

export default function ProfileUserDetails({ user, showLogout }) {
  const metaData = user?.user_metadata;
  console.log(user);

  const { isOpen } = useSelector((state) => state.productModal);

  const dispatch = useDispatch();

  const handleUpdateUserPencilClick = () => {
    dispatch(openModal());
  };

  return (
    <div className="flex items-center w-100 lg:w-[40%] relative">
      <div className="border-2 overflow-hidden w-20 h-20 md:w-32 md:h-32 flex items-center justify-center border-rose rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {metaData.avatar ? (
          <img
            src={metaData.avatar}
            alt="Preview"
            className="min-w-full min-h-full object-top scale-150"
          />
        ) : (
          <UserRound size={64} className="text-grey_dark" />
        )}
      </div>

      <div className="flex flex-col flex-1 bg-white rounded-md p-2">
        <div className="flex items-baseline justify-between ml-2 md:ml-8">
          <h2 className="text-xl md:text-2xl font-bold text-grey_dark mt-2 md:mt-4">
            {metaData?.name}
          </h2>
        </div>
        <div className="flex items-center justify-between ml-2 md:ml-8">
          <div className="">
            <div className="mt-1 flex text-gray-600 bg-gray-100 rounded-lg">
              <Mail size={16} className="mr-2 text-rose" />
              <span className="text-xs">{user.email}</span>
            </div>
            <div className="mt-1 flex text-gray-600 bg-gray-100 rounded-lg">
              <Phone size={16} className="mr-2 text-rose" />
              <span className="text-xs">
                {metaData.contact ? metaData.contact : "N/A"}
              </span>
            </div>
          </div>
          <div className="mt-4">{showLogout && <Logout />}</div>
        </div>
      </div>
      {showLogout && (
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={handleUpdateUserPencilClick}
        >
          <Pencil size={18} />
        </div>
      )}

      {isOpen && <ProductModal children={<UpdateUserDetailsForm />} />}
    </div>
  );
}
