import React from "react";

const Card = ({ item, page, info, height }) => {
  return (
    <>
      <div
        className={`relative shadow-lg w-full rounded-lg ${
          height ? height : "h-36"
        } bg-cover bg-center flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300`}
        style={{
          backgroundImage: `url(${item.picture})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {page === "Products" ? (
          <div className="absolute bottom-0 w-full p-3 text-white">
            <h3 className="text-sm font-medium mb-1">{item.name}</h3>
            <div className="flex items-center">
              <span className="text-lg font-bold">₹{item.price}</span>
              <span className="text-xs ml-1">/day</span>
            </div>
          </div>
        ) : (
          <div className="absolute bottom-0 w-full bg-black/40 p-2">
            <div className="flex justify-between items-center text-xs font-medium text-white">
              {info && (
                <>
                  <div>
                    <span className="block opacity-80">From</span>
                    <span>{info.start_date}</span>
                  </div>
                  <div className="text-right">
                    <span className="block opacity-80">To</span>
                    <span>{info.end_date}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
