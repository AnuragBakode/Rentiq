import React from "react";

const Card = ({ item }) => {
  return (
    <>
      <div
        className="relative shadow-lg w-full rounded-md h-44 bg-cover bg-center flex flex-col justify-between overflow-hidden cursor-pointer"
        style={{
          backgroundImage: `url(${item.picture})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-2 left-2 text-lg font-medium text-white">
          ₹ {item.price}
        </div>
      </div>
    </>
  );
};

export default Card;
