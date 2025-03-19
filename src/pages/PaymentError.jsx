import { X, ArrowRight } from "lucide-react";
import Confetti from "react-confetti";
import { Link } from "react-router";

const PaymentError = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="flex flex-col items-center bg-white shadow-2xl rounded-3xl p-10 text-center max-w-md border-grey-200">
          <div className="flex items-center justify-center text-white bg-red w-20 h-20 rounded-full mx-auto">
            <X size={60} />
          </div>
          <h2 className="text-sm md:text-xl font-bold mt-6 text-gray-800">
            There was an error occured during the payment!
          </h2>
          <p className="text-md text-gray-600 mt-3 text-base md:text-lg">
            If the amount has been deducted and the order is not placed then
            please wait for some time. The amount will get debited in 5-7
            working days or the order will get placed soon.
          </p>

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

export default PaymentError;
