import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronRight } from "lucide-react";
import "swiper/css";
import { useNavigate } from "react-router";

const Carousel = ({ title, items }) => {
  const navigate = useNavigate();
  const handleCardClick = (category) => {
    navigate(`/products?category=${category}`);
  };
  return (
    <section className="mb-8 mt-8 lg:mt-16 lg:pr-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg sm-text:xl md:text-4xl font-bold bg-gradient-to-r from-orange to-rose bg-clip-text text-transparent">
          {title}
        </h2>
        <button className="flex items-center text-xs sm:text-sm font-medium text-gray-600 hover:text-orange transition-colors">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1200: { slidesPerView: 6 },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={index}
            onClick={() => handleCardClick(item.type)}
            className="cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
          >
            <div
              className="relative shadow-xl w-full rounded-2xl h-52 sm:60 lg:h-80 bg-cover bg-center flex flex-col justify-between overflow-hidden group"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>

              <div className="absolute bottom-0 left-2 lg:left-0 p-1 lg:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-sm sm:text-md md:text-lg lg:text-xl font-bold text-white mb-2">
                  {item.type}
                </h3>
                <p className="text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore our collection of {item.type.toLowerCase()}
                </p>
              </div>

              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Carousel;
