import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Carousel: React.FC = () => {
  return (
    <div className="container-fluid p-0">
      <div id="header-carousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          {/* Carousel Item 1 */}
          <div className="carousel-item active">
            <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: "900px" }}>
                <h4 className="text-white text-uppercase mb-md-3">
                  Tours & Travel
                </h4>
                <h1 className="display-3 text-white mb-md-4">
                  Let's Discover The World Together
                </h1>
                <Link
                  to="/booknow"
                  className="btn btn-primary py-md-3 px-md-5 mt-2"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>

          {/* Carousel Item 2 */}
          <div className="carousel-item">
            <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: "900px" }}>
                <h4 className="text-white text-uppercase mb-md-3">
                  Tours & Travel
                </h4>
                <h1 className="display-3 text-white mb-md-4">
                  Discover Amazing Places With Us
                </h1>
                <a
                  href="package.html"
                  className="btn btn-primary py-md-3 px-md-5 mt-2"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <a
          className="carousel-control-prev"
          href="#header-carousel"
          role="button"
          data-slide="prev"
        >
          <div
            className="btn btn-dark"
            style={{ width: "45px", height: "45px" }}
          >
            <span className="carousel-control-prev-icon mb-n2"></span>
          </div>
        </a>
        <a
          className="carousel-control-next"
          href="#header-carousel"
          role="button"
          data-slide="next"
        >
          <div
            className="btn btn-dark"
            style={{ width: "45px", height: "45px" }}
          >
            <span className="carousel-control-next-icon mb-n2"></span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Carousel;
