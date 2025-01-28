import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronRight } from "lucide-react";
import "swiper/css";

const Carousel = ({ title, items }) => {
  return (
    <section className="mb-8 pl-10 pr-10">
      <h2 className="text-3xl font-bold text-orange mb-6">{title}</h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1200: { slidesPerView: 6 },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative shadow-lg w-full rounded-xl h-72 bg-cover bg-center flex flex-col justify-between overflow-hidden"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-2 left-2 text-lg font-medium text-white">
                {item.type}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Carousel;
