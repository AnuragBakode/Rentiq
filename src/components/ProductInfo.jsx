import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapPin } from "lucide-react";
import { addToCart, openCart, resetMessage } from "../redux/CartSlice";
import supabase from "../supabase/auth";
import { CircleUser } from "lucide-react";
import { useNavigate } from "react-router";
import { closeModal } from "../redux/ProductModalSlice";
import { Loader2 } from "lucide-react";
import { Loader2Icon } from "lucide-react";

const ProductInfo = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [owner, setOwner] = useState("");
  const { product } = useSelector((state) => state.productModal);
  const { message } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getOwnerDetails() {
      let { data: userDetails, error } = await supabase.functions.invoke(
        "getUserDetails",
        {
          body: { id: product.user_id },
          headers: {
            Authorization: `Bearer ${
              JSON.parse(
                localStorage.getItem("sb-dpbexlknorwqhblxxmfl-auth-token")
              ).access_token
            }`,
          },
        }
      );

      setOwner(JSON.parse(userDetails));
      setLoading(false);
    }

    getOwnerDetails();
  }, []);

  console.log(owner);

  const dispatch = useDispatch();

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

    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
  };

  const handleGoToCart = () => {
    dispatch(openCart());
  };

  const navigate = useNavigate();
  const handleUserRedirect = (id) => {
    dispatch(closeModal());
    navigate(`/users/${id}`);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row h-full lg:overflow-hidden">
        <div className="flex flex-col basis-[50%] h-full rounded-lg shadow-lg">
          <div
            style={{ backgroundImage: `url(${product.picture})` }}
            className="h-full w-full bg-cover bg-center rounded-lg transition-transform duration-300 hover:scale-105 min-h-[250px]"
          ></div>
        </div>
        <div className="ml-0 lg:ml-10 lg:overflow-y-auto flex-1 lg:pr-4">
          <h1 className="mt-2 lg:mt-0 text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-sm leading-7 text-gray-600 tracking-wide font-light">
            {product.description}
          </p>
          <div className="flex items-center mt-6 bg-rose/5 p-4 rounded-lg">
            <p className="text-gray-700 font-medium">Price:</p>
            <p className="ml-2 text-rose font-bold text-lg">
              ₹{product.price}/day
            </p>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-center mt-4 text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <p className="text-sm">{product.location}</p>
            </div>
            {/*Product Owner Details*/}
            {!loading ? (
              <div
                className="flex cursor-pointer"
                onClick={() => handleUserRedirect(product.user_id)}
              >
                <p>{owner.name}</p>
                <div className="ml-3">
                  {owner.avatar ? (
                    <img
                      src={owner.avatar}
                      alt="Owner"
                      className="rounded-full w-7 h-7 object-cover"
                    />
                  ) : (
                    <CircleUser className="w-full h-full text-gray-400" />
                  )}
                </div>
              </div>
            ) : (
              <Loader2Icon size={24} />
            )}
          </div>
          <div className=" mt-2 lg:mt-8 bg-gray-50 p-2 lg:p-4 rounded-lg shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Select Rental Period
            </h3>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1 relative group">
                <label
                  htmlFor="start-date"
                  className="block mb-1.5 text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="start-date"
                    className="w-full cursor-pointer bg-white border border-gray-200 rounded-md p-2
                    focus:outline-none focus:border-rose/50 focus:ring-1 focus:ring-rose/20
                    hover:border-gray-300 transition-all duration-200 text-sm"
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-rose/70 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative group">
                <label
                  htmlFor="end-date"
                  className="block mb-1.5 text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="end-date"
                    className="w-full cursor-pointer bg-white border border-gray-200 rounded-md p-2
                    focus:outline-none focus:border-rose/50 focus:ring-1 focus:ring-rose/20
                    hover:border-gray-300 transition-all duration-200 text-sm"
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-rose/70 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {message && (
            <p className="mt-6 text-rose text-sm bg-rose/5 p-3 rounded-lg">
              {message}
            </p>
          )}
          <div className="flex flex-row space-x-4 mt-8">
            <button
              className="flex-1 bg-rose/30 py-3 px-6 rounded-lg text-rose font-bold shadow-sm hover:shadow-md transition-all duration-200"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="flex-1 bg-grey_dark/50 hover:bg-gray-700 py-3 px-6 rounded-lg text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
              onClick={handleGoToCart}
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
