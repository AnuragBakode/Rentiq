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
    <div className="flex flex-row space-y-4 md:space-y-0 md:space-x-4 mt-10">
      <input
        type="text"
        placeholder="Search a product or"
        className="w-full md:w-64 px-4 py-3 border rounded-lg focus:outline-none"
        onChange={(e) => {
          setProduct(e.target.value);
          setUser("");
        }}
        value={product}
      />
      <input
        type="text"
        placeholder="Search a user"
        className="w-full md:w-64 px-4 py-3 border rounded-lg focus:outline-none"
        onChange={(e) => {
          setUser(e.target.value);
          setProduct("");
        }}
        value={user}
      />
      <button
        className="flex items-center bg-rose text-white px-6 py-3 rounded-lg shadow-md"
        onClick={handleSubmit}
      >
        <Search className="w-5 h-5 mr-2" /> Search
      </button>
    </div>
  );
};

export default SearchBox;
