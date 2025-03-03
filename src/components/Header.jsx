import React from "react";
import { Search } from "lucide-react";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className="mt-10">
        <div className="flex flex-col justify-between">
          <div className="mb-3">
            <h1 className="text-6xl font-thin tracking-wider bg-gradient-to-r from-rose to-purple-600 bg-clip-text text-transparent animate-fade-in">
              Good morning, Anurag
            </h1>
          </div>

          <div className="flex flex-col">
            <h3 className="mb-2 font-semibold text-grey_dark/50 text-sm tracking-wide">
              What are you looking for?
            </h3>
            <div className="mt-5">
              <SearchBox />
            </div>
          </div>
          <div className="mt-10 flex flex-row gap-4 cursor-pointer">
            <div
              className="relative flex-1 bg-[url('https://images.unsplash.com/photo-1550859492-d5da9d8e45f3')] bg-cover bg-center h-48 rounded-lg overflow-hidden"
              onClick={() => navigate("/products")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70"></div>
              <div className="relative z-10 p-6">
                <h3 className="text-2xl font-bold mb-3 text-white">
                  Browse Products
                </h3>
                <p className="text-white text-lg">
                  Explore our wide range of products available for rent
                </p>
              </div>
            </div>
            <div className="relative flex-1 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe')] bg-cover bg-center h-48 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70"></div>
              <div className="relative z-10 p-6">
                <h3 className="text-2xl font-bold mb-3 text-white">
                  Trending Products
                </h3>
                <p className="text-white text-lg">
                  Check out what's popular right now
                </p>
              </div>
            </div>
            <div className="relative flex-1 bg-[url('https://images.unsplash.com/photo-1567095761054-7a02e69e5c43')] bg-cover bg-center h-48 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70"></div>
              <div className="relative z-10 p-6">
                <h3 className="text-2xl font-bold mb-3 text-white">
                  Products on Sale
                </h3>
                <p className="text-white text-lg">
                  Great deals and discounts on rental items
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Header;
