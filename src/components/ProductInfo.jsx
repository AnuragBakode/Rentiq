import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapPin } from "lucide-react";
import { addToCart, openCart } from "../redux/CartSlice";

const ProductInfo = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { product } = useSelector((state) => state.productModal);
  const { message } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Product Info Moounted");
  }, []);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        startDate,
        endDate,
      })
    );
    setStartDate("");
    setEndDate("");
  };

  const handleGoToCart = () => {
    dispatch(openCart());
  };

  return (
    <div className="flex h-full">
      <div className="flex flex-col basis-[50%] border h-full">
        <div
          style={{ backgroundImage: `url(${product.picture})` }}
          className="h-full w-full bg-cover bg-center"
        ></div>
      </div>
      <div className="ml-7 overflow-y-auto flex-[50%] scrollbar-hide">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="mt-5 text-xs leading-5 tracking-wider">
          {product.description}
        </p>
        <div className="flex mt-3 font-bold text-rose text-md">
          <p className="">Price :</p>
          <p> ₹ {product.price} / day</p>
        </div>
        <div className="text-sm ml-5 mt-3 ">
          <p className="relative">
            {product.location}
            <MapPin className="absolute top-1 -left-5" size={16} />
          </p>
        </div>
        <div class="flex space-x-4 mt-5">
          <div class="flex flex-col">
            <label for="start-date" class="mb-1 text-gray-600 font-medium">
              Start Date
            </label>
            <input
              type="date"
              id="start-date"
              class="cursor-pointer border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
            />
          </div>
          <div class="flex flex-col">
            <label for="end-date" class="mb-1 text-gray-600 font-medium">
              End Date
            </label>
            <input
              type="date"
              id="end-date"
              class="cursor-pointer border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
            />
          </div>
        </div>
        {message && <p className="mt-5 text-rose text-sm">{message}</p>}
        <div>
          <button
            className="px-4 bg-rose py-2 rounded-md text-white font-semibold mr-5"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="px-4 bg-rose py-2 rounded-md text-white font-semibold mt-7"
            onClick={handleGoToCart}
          >
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
