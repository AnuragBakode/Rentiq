import React from "react";
import { MapPin, Circle } from "lucide-react";

const ProductCard = ({ product }) => {
  const { picture } = product;

  return (
    <div>
      <div className="cursor-pointer group m-2 relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-60 hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-36 m-2.5 overflow-hidden text-white rounded-md">
          <img
            className="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110 w-full h-full object-cover"
            src={picture}
            alt="investment-seed-round"
          />
        </div>
        <div className="flex flex-row-reverse items-center justify-between mx-2 my-1">
          <Circle size={40} strokeWidth={1.25} />
          <button
            className="text-sm bg-rose text-white py-1 px-2 rounded-md font-semibold"
            type="button"
          >
            Rent Now
          </button>
        </div>
        {/* <div className="mb-2 ml-2 text-slate-800 text-xs flex items-start text-black font-semibold">
          <p className="relative ml-6 mr-2">
            {address}
            <MapPin
              size={24}
              strokeWidth={2}
              className="absolute top-0 -left-7"
            />
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
