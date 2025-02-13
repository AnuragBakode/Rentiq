import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, closeCart, removeFromCart } from "../redux/CartSlice";
import { Trash2 } from "lucide-react";
import supabase from "../supabase/auth";
import Loader from "../components/Loader";

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [available, setAvailable] = useState("");

  const dispatch = useDispatch();
  const { cartItems, cartTotal } = useSelector((state) => state.cart);
  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  const checkAvailability = async () => {
    setLoading(true);

    const { data, error } = await supabase.functions.invoke(
      "checkAvailability",
      {
        body: {
          items: cartItems,
        },
        headers: {
          Authorization: `Bearer ${
            JSON.parse(
              localStorage.getItem("sb-dpbexlknorwqhblxxmfl-auth-token")
            ).access_token
          }`,
        },
      }
    );

    const available = JSON.parse(data)?.available;

    console.log(available);

    if (error) {
      setError(error.message);
    }

    if (available === true) {
      setAvailable("true");
    } else if (available === false) {
      setAvailable("false");
    }

    setTimeout(() => {
      setAvailable("");
    }, 3000);

    setLoading(false);
  };

  const handleCheckout = async () => {
    console.log("Checkout Clicked");
    const { data, error } = await supabase.functions.invoke("placeOrders", {
      body: {
        items: cartItems,
      },
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("sb-dpbexlknorwqhblxxmfl-auth-token"))
            .access_token
        }`,
      },
    });

    if (error) {
      alert("Failed");
    }

    if (data) {
      dispatch(clearCart());
      dispatch(closeCart());
      alert("Order Placed Successfully");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-40 select-none">
        <div
          className={`w-1/2 h-full bg-white shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out relative z-10 select-text}`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button
              onClick={handleCloseCart}
              className="text-gray-600 hover:text-black"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="flex items-start gap-4  bg-grey">
                  <img
                    src={item.product.picture}
                    alt={item.product.name}
                    className="w-20 h-20 rounded "
                  />
                  <div className="flex-[30]">
                    <h3 className="text-md font-medium">{item.product.name}</h3>
                    <p className="text-gray-500">₹ {item.product.price}</p>
                  </div>
                  <div className="flex gap-10 flex-[30]">
                    <div>
                      <h3 className="font-bold">From</h3>
                      <p>{item.startDate}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">To</h3>
                      <p>{item.endDate}</p>
                    </div>
                  </div>
                  <div
                    className="text-rose m-5 cursor-pointer"
                    onClick={() => {
                      dispatch(removeFromCart(item));
                    }}
                  >
                    <Trash2 />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Your cart is empty</p>
            )}
          </div>
          <div className="p-4 bg-white">
            {error && <p>{error}</p>}
            <div className="mb-3 text-rose font-bold">
              {available === "true" ? (
                <p>All the items are available</p>
              ) : available === "false" ? (
                <p>Few items are not available, Kindly check the items</p>
              ) : (
                <p></p>
              )}
            </div>

            <div className="flex items-center">
              <h3 className="font-semibold mr-8">Total - ₹ {cartTotal}</h3>
              <button
                className="flex-1 bg-green text-white py-3 rounded-lg hover:bg-gray-800 transition font-bold mr-8"
                onClick={checkAvailability}
              >
                Check Availability
              </button>
              <button
                className="flex-1 bg-green text-white py-3 rounded-lg hover:bg-gray-800 transition font-bold"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
