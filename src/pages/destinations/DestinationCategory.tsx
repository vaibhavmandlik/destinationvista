import React, { useEffect, useState } from "react";
import SearchBar from "../Searchbar/SearchBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../Searchbar/SearchContext";

const apiUrl = import.meta.env.VITE_API_URL;

interface DestinationCategoryProps {
  isShowSearchBar?: boolean;
}

interface Destination {
  imagePath: string,
  id: number,
  title: string,
  description: string,
  bookingCount: number,
  city_id: number,
}

interface Category {
  id: number;
  name: string;
  description: string;
  imagePath: string;
}

const DestinationCategory: React.FC<DestinationCategoryProps> = ({
  isShowSearchBar = true,
}) => {
  const { setQuery } = useSearch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [topDestination, setTopDestination] = useState([]);
  const navigate = useNavigate();

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? topDestination.length - 1 : prev - 1));
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === topDestination.length - 1 ? 0 : prev + 1));
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/category`);
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    const fetchTopDestinations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/destination/top`);

        if (response.status === 200) {
          setTopDestination(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
    fetchTopDestinations();

  }, [])

  const chunkArray = (arr: Destination[], size: number) => {
    return arr.reduce<Destination[][]>((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);
  };

  const handleOnClick = (categoryId: number) => {
    setQuery({ category: categoryId });
    navigate("/packages");
  };

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
              {categories.map((category, index) => (
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

            <div className="row">
              {topDestination.length > 0 ? (
                topDestination.map((destination: any, index: number) => (
                  <div className="col-lg-4 col-md-6 mb-4" key={index}>
                    <div className="destination-item position-relative overflow-hidden mb-2">
                      <img
                        className="img-fluid"
                        src={
                          destination.imagePath
                            ?`${apiUrl}${destination.imagePath}`
                            : "/img/default-destination.jpg" // fallback image
                        }
                        alt={destination.title}
                      />
                      <a
                        className="destination-overlay text-white text-decoration-none"
                        href={`/destinations/${destination.id}`}
                      >
                        <h5 className="text-white">{destination.title}</h5>
                        <span>{destination.description}</span>
                        <br />
                        <small>Bookings: {destination.bookingCount}</small>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center w-100">
                  No top destinations available
                </p>
              )}
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
