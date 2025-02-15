import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserRound, Mail } from "lucide-react";

export default function UserDetails() {
  useEffect(() => {
    console.log("UserDetails Remounted");
  }, []);

  const { session } = useSelector((state) => state.session);
  const user = session.user;
  const metaData = user.user_metadata;

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-end">
          <div className="border rounded-full m-1 p-4">
            <UserRound size={48} />
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-xl font-semibold">{metaData.name}</h2>
          <p className="text-gray-600 flex items-center">
            <Mail size={16} strokeWidth={3} className="mr-2 mt-1 text-green" />
            {metaData.email}
          </p>
        </div>
      </div>
    </>
  );
}
