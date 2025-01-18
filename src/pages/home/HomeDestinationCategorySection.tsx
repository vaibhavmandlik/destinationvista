import React, { useState } from "react";

interface Destination {
  imgSrc: string;
  title: string;
  description: string;
}

const destinations: Destination[][] = [
  [
    {
      imgSrc: "img/destination-1.jpg",
      title: "Rajasthan",
      description: "Where History Meets Grandeur!",
    },
    {
      imgSrc: "img/destination-2.jpg",
      title: "Goa",
      description: "Your Escape to Paradise!",
    },
    {
      imgSrc: "img/destination-3.jpg",
      title: "Kerala",
      description: "Backwaters, Bliss, and Breathtaking Beauty!",
    },
  ],
  [
    {
      imgSrc: "img/destination-4.jpg",
      title: "Uttarakhand",
      description: "Find Your Spiritual Calling in the Land of Gods!",
    },
    {
      imgSrc: "img/destination-5.jpg",
      title: "Himachal Pradesh",
      description: "Where the Hills Come Alive with Adventure!",
    },
    {
      imgSrc: "img/destination-6.jpg",
      title: "Maharashtra",
      description: "From Caves to Coasts, Maharashtra Has It All!",
    },
  ],
];
interface Category {
  title: string;
  description: string;
  image: string;
  altText: string;
  overlayText: string;
}

const categories: Category[] = [
  {
    title: "Adventure",
    description: "Embark on thrilling journeys in nature and beyond.",
    image: "img/category-1.jpg",
    altText: "Adventure",
    overlayText: "Exciting Experiences Await!",
  },
  {
    title: "Romantic",
    description: "Intimate settings for unforgettable moments.",
    image: "img/category-2.jpg",
    altText: "Romantic",
    overlayText: "Perfect Escapes for Two!",
  },
  {
    title: "Family",
    description: "Fun-filled destinations for every family member to enjoy.",
    image: "img/category-3.jpg",
    altText: "Family",
    overlayText: "Memorable Moments for All!",
  },
  {
    title: "Beach",
    description: "Soak in the sun and enjoy peaceful seaside getaways.",
    image: "img/category-4.jpg",
    altText: "Beach",
    overlayText: "Sun, Sand & Serenity!",
  },
  {
    title: "Cultural",
    description: "Experience the history and traditions of unique places.",
    image: "img/category-5.jpg",
    altText: "Cultural",
    overlayText: "Dive into Rich Heritage!",
  },
  {
    title: "Adventure Sports",
    description: "Feel the rush with action-packed, thrilling sports.",
    image: "img/category-6.jpg",
    altText: "Adventure Sports",
    overlayText: "Thrilling Activities Await!",
  },
  {
    title: "Wellness",
    description: "Indulge in relaxation and holistic wellness experiences.",
    image: "img/category-7.jpg",
    altText: "Wellness",
    overlayText: "Relax and Rejuvenate!",
  },
  {
    title: "Cruise",
    description: "Discover beautiful horizons on luxurious cruise journeys.",
    image: "img/category-8.jpg",
    altText: "Cruise",
    overlayText: "Explore the Seas!",
  },
];
const HomeDestinationCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-5 pb-3">
            <h6
              className="text-primary text-uppercase"
              style={{ letterSpacing: "5px" }}
            >
              Categories
            </h6>
            <h1>Explore Packages by Category</h1>
          </div>

          {/* Category Grid */}
          <div className="row">
            {categories.map((category, index) => (
              <div className="col-lg-3 col-md-6 mb-4" key={index}>
                <div className="category-item position-relative overflow-hidden mb-2">
                  <img
                    className="img-fluid category-image"
                    src={category.image}
                    alt={category.altText}
                  />
                  <div className="category-overlay text-center text-white d-flex flex-column justify-content-center">
                    <h5>{category.title}</h5>
                    <span>{category.overlayText}</span>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <h5>{category.title}</h5>
                  <p>{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* destination carousel */}
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6
              className="text-primary text-uppercase"
              style={{ letterSpacing: "5px" }}
            >
              Destination
            </h6>
            <h1>Explore Top Destinations</h1>
          </div>
          {/* Carousel */}
          <div className="carousel slide">
            <div className="carousel-inner">
              {destinations.map((slide, index) => (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === activeIndex ? "active" : ""
                  }`}
                >
                  <div className="row">
                    {slide.map((destination, idx) => (
                      <div className="col-lg-4 col-md-6 mb-4" key={idx}>
                        <div className="destination-item position-relative overflow-hidden mb-2">
                          <img
                            className="img-fluid"
                            src={destination.imgSrc}
                            alt={destination.title}
                          />
                          <a
                            className="destination-overlay text-white text-decoration-none"
                            href="#"
                          >
                            <h5 className="text-white">{destination.title}</h5>
                            <span>{destination.description}</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Custom Arrow Controls */}
            <button
              className="carousel-control-prev custom-prev"
              onClick={handlePrev}
            >
              <span
                className="carousel-control-prev-icon d-flex align-items-center justify-content-center p-3"
                aria-hidden="true"
              >
                <i className="fas fa-chevron-left fa-2x text-primary"></i>
              </span>
              <span className="sr-only">Previous</span>
            </button>
            <button
              className="carousel-control-next custom-next"
              onClick={handleNext}
            >
              <span
                className="carousel-control-next-icon d-flex align-items-center justify-content-center p-3"
                aria-hidden="true"
              >
                <i className="fas fa-chevron-right fa-2x text-primary"></i>
              </span>
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeDestinationCarousel;
