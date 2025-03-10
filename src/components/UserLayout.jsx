import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

const UserLayout = () => {
  useEffect(() => {
    console.log("User Layout rendered");
  }, []);
  return (
    <div className="w-11/12 m-auto">
      <div className="mt-5">
        <NavBar />
      </div>
      <Outlet />
    </div>
  );
};

export default UserLayout;
