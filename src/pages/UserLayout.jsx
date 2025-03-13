import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";

const UserLayout = () => {
  useEffect(() => {
    console.log("User Layout rendered");
  }, []);
  return (
    <div className="w-11/12 m-auto">
      <div className="sticky top-0 pt-6 z-10 bg-white">
        <NavBar />
      </div>
      <Outlet />
    </div>
  );
};

export default UserLayout;
