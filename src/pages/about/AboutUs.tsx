import React from "react";
import PageHeader from "../pageheader/pageHeader";

const AboutUs: React.FC = () => {
  return (
    <>
      {/* <!-- Header Start --> */}
      <PageHeader
        title="About"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "About" }]}
      />
      <div className="container-fluid py-5">
        <div className="container pt-5">
          <div className="row">
            {/* Left Image Section */}
            <div className="col-lg-6" style={{ minHeight: "500px" }}>
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100"
                  src="img/about.jpg"
                  alt="About Us"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Right Content Section */}
            <div className="col-lg-6 pt-5 pb-lg-5">
              <div className="about-text bg-white p-4 p-lg-5 my-lg-5">
                <h6
                  className="text-primary text-uppercase"
                  style={{ letterSpacing: "5px" }}
                >
                  About Us
                </h6>
                <h1 className="mb-3">
                  We Provide Best Tour Packages In Your Budget
                </h1>
                <p>
                  At Destination Vista, we believe that exploring the world
                  should be accessible to everyone. Our mission is to create
                  unforgettable travel experiences tailored to your needs and
                  budget. With a team of passionate travel experts, we curate
                  unique tour packages that showcase the beauty and diversity of
                  each destination.
                </p>
                <div className="row mb-4">
                  {/* Two Small Images */}
                  <div className="col-6">
                    <img
                      className="img-fluid"
                      src="img/about-1.jpg"
                      alt="About 1"
                    />
                  </div>
                  <div className="col-6">
                    <img
                      className="img-fluid"
                      src="img/about-2.jpg"
                      alt="About 2"
                    />
                  </div>
                </div>
                {/* Know More Button */}
                <a href="contact.html" className="btn btn-primary mt-1">
                  Know More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Section */}
      <div
        className="container-fluid bg-registration py-5"
        style={{
          margin: "90px 0",
          // backgroundImage: `url(${bgImgRegistration}})`,
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-5 mb-lg-0">
              <div className="mb-4">
                <h6
                  className="text-primary text-uppercase"
                  style={{ letterSpacing: "5px" }}
                >
                  Join Our Community
                </h6>
                <h1 className="text-white">Discover the World with Us</h1>
              </div>
              <p className="text-white">
                At Destination Vista, we are dedicated to making travel dreams a
                reality. Join our community to receive exclusive offers,
                personalized travel insights, and updates on the latest tour
                packages. Experience the joy of exploration and connect with
                fellow travelers who share your passion for adventure!
              </p>
              <ul className="list-inline text-white m-0">
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>
                  Exclusive deals on top travel packages.
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>
                  Personalized travel recommendations tailored for you.
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>
                  Stay informed with the latest travel trends and tips.
                </li>
              </ul>
            </div>
            <div className="col-lg-5">
              <div className="card border-0">
                <div className="card-header bg-primary text-center p-4">
                  <h1 className="text-white m-0">Sign Up Now</h1>
                </div>
                <div className="card-body rounded-bottom bg-white p-5">
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control p-4"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control p-4"
                        placeholder="Your email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <select
                        className="custom-select px-4"
                        style={{ height: "47px" }}
                      >
                        <option selected>Select a destination</option>
                        <option value="1">Maharashtra</option>
                        <option value="2">Goa</option>
                        <option value="3">Manali</option>
                      </select>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary btn-block py-3"
                        type="submit"
                      >
                        Join Us Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feature Section */}
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
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="service-item bg-white text-center mb-2 py-5 px-4">
                <i className="fa fa-2x fa-suitcase-rolling mx-auto mb-4"></i>
                <h5 className="mb-2">Customizable Travel Packages</h5>
                <p className="m-0">
                  Tailor your journey to fit your unique preferences and budget!
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="service-item bg-white text-center mb-2 py-5 px-4">
                <i className="fa fa-2x fa-globe mx-auto mb-4"></i>
                <h5 className="mb-2">Group Travel Packages</h5>
                <p className="m-0">
                  Experience the joy of travel with friends and family with our
                  group packages!
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="service-item bg-white text-center mb-2 py-5 px-4">
                <i className="fa fa-2x fa-calendar-alt mx-auto mb-4"></i>
                <h5 className="mb-2">Seasonal and Special Offers</h5>
                <p className="m-0">
                  Take advantage of limited-time packages for holidays,
                  festivals, and special events!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
