import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import PageHeader from "../pageheader/pageHeader";
import SearchBar from "../Searchbar/SearchBar";

// Define the `Package` type for type safety
type Package = {
  id: string | number;
  title: string;
  description: string;
  price: string;
  image: string;
};

interface TourPackagesProps {
  heading: string;
  subheading: string;
  packages: Package[]; // Array of package objects
  onDetailsBookNowClick: (pkg: Package) => void;
  // onBookNowClick: (pkg: Package) => void;
  onExploreMoreClick: () => void;
  isShowHeader?: boolean;
  isSearchBar?: boolean;
}
// Initial tour packages
const initialPackages: Package[] = [
  {
    id: 1,
    title: "Delhi City Tour",
    description:
      "Explore the vibrant city of Delhi, known for its bustling streets, historic sites, and the iconic India Gate.",
    price: "₹4,500",
    image: "/img/delhi.jpg",
  },
  {
    id: 2,
    title: "Mumbai City Tour",
    description:
      "Explore the vibrant city of Mumbai, known for its bustling streets, historic sites, and the iconic Gateway of India.",
    price: "₹3,500",
    image: "/img/mumbai-tour.jpg",
  },
  {
    id: 3,
    title: "Lonavala Weekend Getaway",
    description:
      "Enjoy a peaceful weekend amidst the scenic beauty of Lonavala, with mesmerizing views and tranquil surroundings.",
    price: "₹5,000",
    image: "/img/lonavla.jpg",
  },
  {
    id: 4,
    title: "Mahabaleshwar Nature Retreat",
    description:
      "Experience the beauty of Mahabaleshwar, known for its strawberry farms, waterfalls, and breathtaking landscapes.",
    price: "₹6,500",
    image: "/img/mahabaleshwar.jpg",
  },
];

// Additional tour packages
const morePackages: Package[] = [
  {
    id: 5,
    title: "Goa Beach Tour",
    description:
      "Relax and unwind at the beautiful beaches of Goa, famous for its coastal beauty and vibrant nightlife.",
    price: "₹7,000",
    image: "/img/goa.jpg",
  },
  {
    id: 6,
    title: "Kerala Backwaters",
    description:
      "Explore the tranquil backwaters of Kerala in a houseboat cruise, amidst lush green landscapes.",
    price: "₹9,000",
    image: "/img/kerla.jpeg",
  },
];

const PackagesList: React.FC<TourPackagesProps> = ({
  heading,
  subheading,
  isShowHeader = true,
  isSearchBar = true,
}) => {
  const [packagesToShow, setPackagesToShow] =
    useState<Package[]>(initialPackages);
  const navigate = useNavigate();

  // Redirect to the details page
  const onDetailsBookNowClick = (pkg: Package) => {
    navigate(`/packages/${pkg.id}`);
  };

  // Appends more packages to the list
  const onExploreMoreClick = () => {
    setPackagesToShow((prevPackages) => [...prevPackages, ...morePackages]);
  };

  return (
    <>
      {/* not only visible on home page  */}
      {isShowHeader && (
        <PageHeader
          title="Packages"
          breadcrumb={[{ name: "Home", href: "/" }, { name: "Packages" }]}
        />
      )}
      {/* not only visible on home page  */}
      {isSearchBar && (
        <SearchBar
          onSearch={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}

      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          {/* Section Header */}
          <div className="text-center mb-3 pb-3">
            <h6
              className="text-primary text-uppercase"
              style={{ letterSpacing: "5px" }}
            >
              {subheading}
            </h6>
            <h1>{heading}</h1>
          </div>

          {/* Package List */}
          <div className="row">
            {packagesToShow.map((pkg) => (
              <div className="col-lg-12 mb-4" key={pkg.id}>
                <div className="card border-0 shadow" style={{ width: "100%" }}>
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src={pkg.image}
                        className="card-img"
                        alt={`Image of ${pkg.title}`}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{pkg.title}</h5>
                        <p className="card-text">{pkg.description}</p>
                        <p className="text-primary">
                          <strong>Price: {pkg.price}</strong>
                        </p>
                        <div className="d-flex">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => onDetailsBookNowClick(pkg)}
                            aria-label={`View details of ${pkg.title}`}
                          >
                            Details
                          </button>
                          <button
                            className="btn btn-primary ml-2"
                            onClick={() => onDetailsBookNowClick(pkg)}
                            aria-label={`Book now for ${pkg.title}`}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Explore More Packages Button */}
          <div className="text-center mt-4">
            <button
              className="btn btn-primary"
              onClick={onExploreMoreClick}
              style={{ padding: "10px 20px", fontWeight: "bold" }}
            >
              Explore More Packages
            </button>
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
              {[1, 2].map((_slide, idx) => (
                <div
                  className={`carousel-item ${idx === 0 ? "active" : ""}`}
                  key={idx}
                >
                  <div className="row">
                    {[
                      {
                        img: `img/destination-${3 * idx + 1}.jpg`,
                        title: "Rajasthan",
                        subtitle: "Where History Meet Grandure!",
                      },
                      {
                        img: `img/destination-${3 * idx + 2}.jpg`,
                        title: "Goa",
                        subtitle: "Your Escape To Paradise!",
                      },
                      {
                        img: `img/destination-${3 * idx + 3}.jpg`,
                        title: "Himachal",
                        subtitle: "Where The Hills Come Alive With Adventure!",
                      },
                      {
                        img: `img/destination-${3 * idx + 1}.jpg`,
                        title: "Rajasthan",
                        subtitle: "Where History Meet Grandure!",
                      },
                      {
                        img: `img/destination-${3 * idx + 2}.jpg`,
                        title: "Goa",
                        subtitle: "Your Escape To Paradise!",
                      },
                      {
                        img: `img/destination-${3 * idx + 3}.jpg`,
                        title: "Himachal",
                        subtitle: "Where The Hills Come Alive With Adventure!",
                      },
                    ].map((destination, index) => (
                      <div className="col-lg-4 col-md-6 mb-4" key={index}>
                        <div className="destination-item position-relative overflow-hidden mb-2">
                          <img
                            className="img-fluid"
                            src={destination.img}
                            alt={destination.title}
                          />
                          <a
                            className="destination-overlay text-white text-decoration-none"
                            href=""
                          >
                            <h5 className="text-white">{destination.title}</h5>
                            <span>{destination.subtitle}</span>
                          </a>
                        </div>
                      </div>
                    ))}
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

export default PackagesList;
