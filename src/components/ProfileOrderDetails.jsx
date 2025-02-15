import React from "react";

const ProfileOrderDetails = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
      <div className="flex space-x-4 mb-4">
        <button className="px-4 py-2 bg-white shadow rounded border">
          Orders Placed
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded">
          Orders Received
        </button>
      </div>
    </div>
  );
};

export default ProfileOrderDetails;
