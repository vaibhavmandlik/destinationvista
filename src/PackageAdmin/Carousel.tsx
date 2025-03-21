import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const Carousel = ({ images, className }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className={className}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-auto rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
