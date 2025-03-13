import { useState, useEffect } from "react";
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
    setLoading(true);
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
      console.log(error);
    }

    if (data) {
      dispatch(clearCart());
      dispatch(closeCart());
    }

    setLoading(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-end z-40 overflow-hidden">
        <div className="w-[550px] h-full bg-white shadow-2xl flex flex-col transform transition-all duration-300 ease-in-out overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
            <button
              onClick={handleCloseCart}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-3 flex items-center gap-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.picture}
                      alt={item.product.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-200"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-base font-semibold text-gray-800">
                      {item.product.name}
                    </h3>
                    <p className="text-rose text-sm font-medium">
                      ₹{item.product.price}/day
                    </p>

                    <div className="flex gap-4 mt-1 text-xs">
                      <div className="bg-gray-50 px-2 py-1 rounded">
                        <h4 className="text-gray-500 font-medium">From</h4>
                        <p className="text-gray-800">{item.startDate}</p>
                      </div>
                      <div className="bg-gray-50 px-2 py-1 rounded">
                        <h4 className="text-gray-500 font-medium">To</h4>
                        <p className="text-gray-800">{item.endDate}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => dispatch(removeFromCart(item))}
                    className="p-1.5 text-gray-400 hover:text-rose transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-400 mt-2">
                  Add some items to get started
                </p>
              </div>
            )}
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100">
            {error && (
              <p className="text-rose mb-4 bg-rose/10 p-3 rounded-lg">
                {error}
              </p>
            )}

            {available && (
              <div
                className="mb-4 p-3 rounded-lg font-medium"
                style={{
                  backgroundColor:
                    available === "true"
                      ? "rgba(34, 197, 94, 0.1)"
                      : "rgba(239, 68, 68, 0.1)",
                  color:
                    available === "true"
                      ? "rgb(34, 197, 94)"
                      : "rgb(239, 68, 68)",
                }}
              >
                {available === "true"
                  ? "All items are available for your selected dates"
                  : "Some items are not available for the selected dates"}
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Total</h3>
              <p className="text-2xl font-bold text-rose">₹{cartTotal}</p>
            </div>

            <div className="flex gap-4">
              <button
                className="flex-1 bg-grey_dark/85 text-xs sm:text-sm text-white py-3 px-4 sm:py-3 sm:px-6 rounded-lg hover:bg-gray-200 transition font-medium"
                onClick={checkAvailability}
              >
                Check Availability
              </button>
              <button
                className="flex-1 bg-rose text-xs sm:text-sm text-white py-3 px-6 rounded-lg hover:bg-rose/90 transition font-medium"
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
