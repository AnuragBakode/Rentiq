import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserRound, Mail } from "lucide-react";
import Logout from "./Logout";

export default function ProfileUserDetails() {
  const { session } = useSelector((state) => state.session);
  const user = session.user;
  const metaData = user.user_metadata;

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col px-4">
            <div className="border-2 border-rose rounded-full p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 w-fit">
              <UserRound size={48} className="text-grey_dark" />
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-grey_dark">
                {metaData.name}
              </h2>
              <div className="mt-3 flex items-center text-gray-600 bg-gray-50 rounded-lg py-2 w-fit">
                <Mail size={16} className="mr-2 text-rose" />
                <span className="text-sm">{metaData.email}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 px-4">
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">
                Account Details
              </h3>
              <div className="mt-3 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <span>
                    Member since {new Date(user.created_at).getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 mt-4">
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
}
