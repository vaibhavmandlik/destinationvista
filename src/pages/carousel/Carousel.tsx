import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Carousel from "bootstrap/js/dist/carousel";
import Button from "@mui/material/Button";

const images = [
  {
    src: "img/carousel-2.jpg",
    alt: "Image 1",
    text: "Let's Discover The World Together",
  },
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
    alt: "Image 2",
    text: "Discover Amazing Places With Us",
  },
];

const CarouselComponent: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselInstance = useRef<Carousel | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselInstance.current = new Carousel(carouselRef.current, {
        interval: 2000,
        pause: "hover",
        wrap: true,
        touch: true,
      });
    }

    return () => {
      if (carouselInstance.current) {
        carouselInstance.current.dispose();
      }
    };
  }, []);

  return (
    <>
      <div className="container-fluid p-0">
        <div
          ref={carouselRef}
          id="header-carousel"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? 'active' : ' '}  `}
              >
                <img
                  className="w-100"
                  src={image.src}
                  alt={image.alt}
                  style={{ height: "600px", objectFit: "cover" }}
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "900px" }}>
                    <h4 className="text-white text-uppercase mb-md-3  fs-4">
                      Tours & Travel
                    </h4>
                    <h1 className="display-3 text-white mb-md-4">
                      {image.text}
                    </h1>
                    <Link to="/packages">
                      <Button
                        sx={{
                          "borderColor":"#42b33cff",
                          "color": "#fff",
                          "&:hover": { backgroundColor: "#5232a8" , border:"#5232a8 solid 1px" },
                        }}
                        variant="contained"
                        size="large"
                      >
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <div
              className="btn btn-dark d-flex align-items-center justify-content-center"
              style={{ width: "45px", height: "45px" }}
            >
              <span className="carousel-control-prev-icon"></span>
            </div>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <div
              className="btn btn-dark d-flex align-items-center justify-content-center"
              style={{ width: "45px", height: "45px" }}
            >
              <span className="carousel-control-next-icon"></span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default CarouselComponent;