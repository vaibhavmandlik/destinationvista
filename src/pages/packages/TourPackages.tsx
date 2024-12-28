import React from "react";

interface Package {
  id: string | number; // Unique identifier for each package
  title: string;
  description: string;
  price: string; // You can use `number` if prices are numeric
  image: string; // URL to the package image
}

interface TourPackagesProps {
  heading: string;
  subheading: string;
  packages: Package[]; // Array of package objects
  onDetailsClick: (pkg: Package) => void;
  onBookNowClick: (pkg: Package) => void;
  onExploreMoreClick: () => void;
}

const TourPackages: React.FC<TourPackagesProps> = ({
  heading,
  subheading,
  packages,
  onDetailsClick,
  onBookNowClick,
  onExploreMoreClick,
}) => {
  return (
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
          {packages.map((pkg) => (
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
                          onClick={() => onDetailsClick(pkg)}
                          aria-label={`View details of ${pkg.title}`}
                        >
                          Details
                        </button>
                        <button
                          className="btn btn-primary ml-2"
                          onClick={() => onBookNowClick(pkg)}
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
  );
};

export default TourPackages;
