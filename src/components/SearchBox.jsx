import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";

const SearchBox = () => {
  const [product, setProduct] = useState("");
  const [user, setUser] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    if (product) {
      navigate(`/products?name=${product}`);
    } else {
      navigate(`/user?name=${user}`);
    }

    setProduct("");
    setUser("");
  };
  
  
  return (
    <div className="max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2.5 bg-transparent outline-none text-sm relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-rose after:scale-x-0 after:transition-transform after:duration-300 focus:after:scale-x-100"
              onChange={(e) => {
                setProduct(e.target.value);
                setUser("");
              }}
              value={product}
            />
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-grey_dark"></span>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full px-4 py-2.5 bg-transparent outline-none text-sm relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-rose after:scale-x-0 after:transition-transform after:duration-300 focus:after:scale-x-100"
              onChange={(e) => {
                setUser(e.target.value);
                setProduct("");
              }}
              value={user}
            />
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-grey_dark"></span>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-4 h-4" />
            </div>
          </div>
        </div>

        <button
          className="bg-rose/90 hover:bg-rose text-white px-6 py-2.5 rounded-md text-sm font-medium shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center space-x-2 min-w-[120px]"
          onClick={handleSubmit}
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
