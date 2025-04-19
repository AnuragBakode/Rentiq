import { User } from "lucide-react";
import React from "react";

const Card = ({ item, info, page, height }) => {
  console.log(info.owner);

  return (
    <>
      <div className="flex shadow-sm rounded-lg h-24 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300 bg-white">
        <div className="w-24 md:w-32 p-2">
          <img
            src={item.picture}
            alt="Product"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 p-2 md:p-3 relative">
          {page === "Products" ? (
            <span
              className={`absolute top-2 right-2 ${
                item.status === "Available"
                  ? "bg-green/10 text-green"
                  : "bg-red/10 text-red"
              } text-xs font-medium px-2 py-1 rounded`}
            >
              {item.status}
            </span>
          ) : (
            <span
              className={`absolute top-2 right-2 ${
                info.status === "Pending"
                  ? "bg-orange/20 text-orange"
                  : info.status === "Cancelled"
                  ? "bg-red/10 text-red"
                  : "bg-green/10 text-green"
              } text-xs font-medium px-2 py-1 rounded`}
            >
              {info.status}
            </span>
          )}

          <h3 className="font-medium text-xs md:text-sm text-grey_dark mb-1">
            {item.name}
          </h3>
          <p className="text-xs font-medium text-rose mb-2">
            <span className="font-normal">₹</span>
            {item.price}
          </p>

          <div className="flex justify-between items-center text-xs">
            {page === "Products" ? (
              <div className="flex gap-1 font-bold">
                <div className=" bg-grey/10 rounded-full">
                  <svg
                    className="w-4 h-4 text-grey_dark"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="text-grey_dark">{item.location}</span>
              </div>
            ) : (
              info && (
                <>
                  <div>
                    <span className="block text-grey_dark">From</span>
                    <span className="font-medium">{info.start_date}</span>
                  </div>
                  <div>
                    <span className="block text-grey_dark">To</span>
                    <span className="font-medium">{info.end_date}</span>
                  </div>
                  {page == "OrdersPlaced" && (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border rounded-full flex items-center justify-center">
                        {info.owner.avatar ? (
                          <img
                            src={info.owner.avatar}
                            className="w-full h-full rounded-full"
                          />
                        ) : (
                          <User size={16} />
                        )}
                      </div>
                      <span className="text-grey_dark">{info.owner.name}</span>
                    </div>
                  )}
                </>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
