import { Check, ArrowRight } from "lucide-react";
import Confetti from "react-confetti";
import { Link, useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const order_id = params.get("order_id");
  const payment_id = params.get("payment_id");

  if (order_id && payment_id) {
    localStorage.setItem("cartItems", "[]");
    localStorage.setItem("cartTotal", 0);
    localStorage.setItem("productCount", 0);
  }

  console.log(order_id, payment_id);

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <Confetti numberOfPieces={200} />

        <div className="flex flex-col items-center bg-white shadow-2xl rounded-3xl p-10 text-center max-w-md border-grey-200">
          <div className="flex items-center justify-center bg-green w-20 h-20 rounded-full mx-auto">
            <Check size={60} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mt-6 text-gray-800">
            Payment Successful! 🎉
          </h2>
          <p className="text-gray-600 mt-3 text-base md:text-lg">
            Your order has been placed successfully.
          </p>

          <div className="mt-5 bg-gray-100 text-gray-700 text-sm px-4 py-3 rounded-lg">
            Order ID: <span className="font-semibold">{order_id}</span>
          </div>

          <Link
            to="/products"
            className="mt-6 flex items-center justify-center gap-2 bg-grey_dark text-white hover:bg-blue-700 px-6 py-3 rounded-full text-base md:text-lg font-semibold transition-shadow shadow-md hover:shadow-lg"
          >
            Explore more
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
