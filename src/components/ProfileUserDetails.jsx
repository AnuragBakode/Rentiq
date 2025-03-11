import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserRound, Mail } from "lucide-react";
import Logout from "./Logout";

export default function ProfileUserDetails({ user, showLogout }) {
  const metaData = user?.user_metadata;

  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-md p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="border-2 border-rose rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <UserRound size={64} className="text-grey_dark" />
        </div>
        <h2 className="text-3xl font-bold text-grey_dark mt-4">
          {metaData?.name}
        </h2>
        <div className="mt-2 flex items-center text-gray-600 bg-gray-100 rounded-lg py-2 px-3">
          <Mail size={18} className="mr-2 text-rose" />
          <span className="text-sm">{metaData?.email}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 w-full">
        <h3 className="text-md font-medium text-gray-500 uppercase mb-2">
          Account Details
        </h3>
        <div className="flex items-center text-sm text-gray-600">
          <span>Member since {new Date(user?.created_at).getFullYear()}</span>
        </div>
      </div>

      <div className="mt-6 w-full flex justify-center">
        {showLogout && <Logout />}
      </div>
    </div>
  );
}
