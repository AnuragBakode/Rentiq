import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserRound, Mail, Phone } from "lucide-react";
import Logout from "./Logout";

export default function ProfileUserDetails({ user, showLogout }) {
  const metaData = user?.user_metadata;

  return (
    <div className="flex items-center justify-start bg-white rounded-md p-2">
      <div className="border-2 border-rose rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <UserRound size={64} className="text-grey_dark" />
      </div>
      <div className="flex flex-col ml-6 md:ml-8">
        <h2 className="text-xl md:text-2xl font-bold text-grey_dark mt-2 md:mt-4">
          {metaData?.name}
        </h2>
        <div className="mt-1 flex text-gray-600 bg-gray-100 rounded-lg">
          <Mail size={16} className="mr-2 text-rose" />
          <span className="text-xs md:text-sm">{metaData?.email}</span>
        </div>
        <div className="mt-1 flex text-gray-600 bg-gray-100 rounded-lg">
          <Phone size={16} className="mr-2 text-rose" />
          <span className="text-xs md:text-sm">
            {metaData.phone ? metaData.phone : "N/A"}
          </span>
        </div>
        <div className="mt-4 w-full flex justify-center">
          {showLogout && <Logout />}
        </div>
      </div>
    </div>
  );
}
