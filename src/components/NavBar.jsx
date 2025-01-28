import React from "react";
import { User } from "lucide-react";
import PostItem from "./PostItem";

const NavBar = () => {
  const handleProfileClick = (e) => {
    console.log(e);
  };
  return (
    <>
      <nav className="text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            alt="Rentiq"
            src="https://dpbexlknorwqhblxxmfl.supabase.co/storage/v1/object/sign/Assets/rentiq-high-resolution-logo-transparent.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBc3NldHMvcmVudGlxLWhpZ2gtcmVzb2x1dGlvbi1sb2dvLXRyYW5zcGFyZW50LnBuZyIsImlhdCI6MTczNzQ2NTc0MSwiZXhwIjo0ODkxMDY1NzQxfQ.xuU4RhE0QuAtjicJoDLz01F9fkqJWKIndBuIEtb4Xgo&t=2025-01-21T13%3A22%3A22.166Z"
            className="mx-auto h-10 w-auto"
          />
        </div>
        <div className="flex items-center space-x-4">
          {/* <button className=" text-white font-semibold px-4 py-2 rounded-lg bg-green">
            Post an Item
          </button> */}
          <PostItem />
          <button
            className="flex items-center border px-4 py-2 rounded-lg text-green hover:bg-blue/90"
            onClick={handleProfileClick}
          >
            <User className="w-5 h-5 mr-2" />
            Profile
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
