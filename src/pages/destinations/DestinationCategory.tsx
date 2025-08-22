import React, { useEffect, useState } from "react";
import SearchBar from "../Searchbar/SearchBar";
import axios from "axios";
import { Category } from "@mui/icons-material";
const apiUrl = import.meta.env.VITE_API_URL;
interface DestinationCategoryProps {
  isShowSearchBar?: boolean;
}

interface Destibation {
  imagePath: string,
  name: string,
  description: string
}

const destinations: Destibation[][] = [
  [
    {
      img: "img/destination-1.jpg",
      title: "Rajasthan",
      subtitle: "Where History Meets Grandeur!",
    },
    {
      img: "img/destination-2.jpg",
      title: "Goa",
      subtitle: "Your Escape to Paradise!",
    },
    {
      img: "img/destination-3.jpg",
      title: "Himachal",
      subtitle: "Where The Hills Come Alive With Adventure!",
    },
  ],
  [
    {
      img: "img/destination-4.jpg",
      title: "Kerala",
      subtitle: "Backwaters, Bliss, and Breathtaking Beauty!",
    },
    {
      img: "img/destination-5.jpg",
      title: "Uttarakhand",
      subtitle: "Find Your Spiritual Calling in the Land of Gods!",
    },
    {
      img: "img/destination-6.jpg",
      title: "Maharashtra",
      subtitle: "From Caves to Coasts, Maharashtra Has It All!",
    },
  ]
]
const DestinationCategory: React.FC<DestinationCategoryProps> = ({
  isShowSearchBar = true,
}) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [catergories, setCategories] = useState([]);
  const [topDestination, setTopDestination] = useState([]);
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? destinations.length - 1 : prev - 1));
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === destinations.length - 1 ? 0 : prev + 1));
  }

  useEffect(() => {
    const fetchTopDestination = async () => {
      try {
        const response = await axios.get(`${apiUrl}/category`);

        if (response.status === 200) {
          setCategories(response.data);
        }

      } catch (error) {
        console.log(error);
      }
    }

    fetchTopDestination();
  }, [])

  const handleOnClick = async (categoryTitle: string) => {
    try {
      const response = axios.get(`${apiUrl}/category/`)

      if ((await response).status === 200) {
        console.log((await response).data);
      }

    } catch (error) {
      console.log("error while fetching catergories", error);
    }
  }
  return (
    <>
      {isShowSearchBar && (
        <SearchBar
          onSearch={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
      <div>
        {/* Categories Section */}
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
            <div className="row">
              {catergories.map((category, index) => (
                <div className="col-lg-3 col-md-6 mb-4" key={index} onClick={() => handleOnClick(category.id)}>
                  <div className="category-item position-relative overflow-hidden mb-2">
                    <img
                      className="img-fluid category-image"
                      src={`${apiUrl}${category.imagePath}`}
                      alt={category.name}
                    />
                     <div className="category-overlay text-center text-white d-flex flex-column justify-content-center">
                    <h5>{category.name}</h5>
                    <span>{category.description}</span>
                  </div>
                  
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Destination Section */}
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
            <div
              id="destinationCarousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                {destinations.map((slide, idx) => (
                  <div
                    className={`carousel-item ${idx === activeIndex ? "active" : ""}`}
                    key={idx}
                  >
                    <div className="row">
                      {slide.map((destination, index) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={index}>
                          <div className="destination-item position-relative overflow-hidden mb-2">
                            <img
                              className="img-fluid"
                              src={destination.img}
                              alt={destination.title}
                            />
                            <a
                              className="destination-overlay text-white text-decoration-none"
                              href="/packages"
                            >
                              <h5 className="text-white">
                                {destination.title}
                              </h5>
                              <span>{destination.subtitle}</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev custom-prev" onClick={handlePrev}>
                <span className="carousel-control-prev-icon d-flex align-items-center justify-content-center p-3">
                  <i className="fas fa-chevron-left fa-2x text-primary"></i>
                </span>
              </button>
              <button className="carousel-control-next custom-next" onClick={handleNext}>
                <span className="carousel-control-next-icon d-flex align-items-center justify-content-center p-3">
                  <i className="fas fa-chevron-right fa-2x text-primary"></i>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="container-fluid py-5">
          <div className="container pt-5 pb-3">
            <div className="text-center mb-3 pb-3">
              <h6
                className="text-primary text-uppercase"
                style={{ letterSpacing: "5px" }}
              >
                Services
              </h6>
              <h1>Travel Packages & Services</h1>
            </div>
            <div className="row">
              {[
                {
                  icon: "fa-suitcase-rolling",
                  title: "Customizable Travel Packages",
                  desc: "Tailor your journey to fit your unique preferences and budget!",
                },
                {
                  icon: "fa-globe",
                  title: "Group Travel Packages",
                  desc: "Experience the joy of travel with friends and family with our group packages!",
                },
                {
                  icon: "fa-calendar-alt",
                  title: "Seasonal and Special Offers",
                  desc: "Take advantage of limited-time packages for holidays, festivals, and special events!",
                },
              ].map((service, index) => (
                <div className="col-lg-4 col-md-6 mb-4" key={index}>
                  <div className="service-item bg-white text-center mb-2 py-5 px-4">
                    <i className={`fa fa-2x ${service.icon} mx-auto mb-4`}></i>
                    <h5 className="mb-2">{service.title}</h5>
                    <p className="m-0">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationCategory;
