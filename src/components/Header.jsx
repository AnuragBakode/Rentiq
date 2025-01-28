import React from "react";
import { Search } from "lucide-react";
import Carousel from "./Carousel";

const Header = () => {
  return (
    <>
      <main className="p-8">
        <div className="flex flex-col justify-between items-center">
          <div className="mb-3">
            <h1 className="text-8xl font-StyleScript font-extralight">
              Good morning, Anurag
            </h1>
          </div>

          <div className="flex flex-col">
            <h3 className="mb-2 font-semibold text-green">
              What are you looking for?
            </h3>
            <div className="flex flex-row space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="text"
                placeholder="Search a product"
                className="w-full md:w-64 px-4 py-3 border rounded-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="Search a user"
                className="w-full md:w-64 px-4 py-3 border rounded-lg focus:outline-none"
              />
              <button className="flex items-center bg-rose text-white px-6 py-3 rounded-lg shadow-md">
                <Search className="w-5 h-5 mr-2" /> Search
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Header;
