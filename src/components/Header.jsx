import React from "react";
import { Search } from "lucide-react";
import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <>
      <main className="">
        <div className="p-8 flex flex-col justify-between items-center">
          <div className="mb-3">
            <h1 className="text-7xl font-StyleScript font-extralight tracking-widest">
              Good morning, Anurag
            </h1>
          </div>

          <div className="flex flex-col">
            <h3 className="mb-2 font-semibold text-green text-lg tracking-wide text-center font-RedRose">
              Short-Term Needs? Long-Term Savings! Rent Now!
            </h3>
            <SearchBox />
          </div>
        </div>
      </main>
    </>
  );
};

export default Header;
