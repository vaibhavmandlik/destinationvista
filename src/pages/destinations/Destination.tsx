import React, { useState } from "react";


const Destination: React.FC = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  return (
    <>
     {/* <!-- Header Start --> */}
     <div className="container-fluid page-header">
        <div className="container">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h3 className="display-4 text-white text-uppercase">Destinations</h3>
            <div className="d-inline-flex text-white">
              <p className="m-0 text-uppercase">
                <a className="text-white" href="">
                  Home
                </a>
              </p>
              <i className="fa fa-angle-double-right pt-1 px-3"></i>
              <p className="m-0 text-uppercase">Destination</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid booking mt-5 pb-5">
        <div className="container pb-5">
          <div
            className="shadow-lg rounded d-flex flex-column align-items-center"
            style={{
              padding: "20px",
              background: "rgba(255, 255, 255, 0.9)",
              maxWidth: "1100px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            }}
          >
            <div className="row w-100 align-items-center justify-content-between mb-2">
              {/* State Input with Default Dropdown + Autocomplete */}
              <div className="col-md-3 position-relative px-1">
                <div
                  className="input-group"
                  style={{
                    border: "1px solid var(--primary)",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    className="input-group-prepend"
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      borderRight: "1px solid var(--primary)",
                      borderRadius: "8px 0 0 8px",
                    }}
                  >
                    <span className="input-group-text border-0">
                      <i
                        className="fas fa-map-marker-alt"
                        style={{ color: "var(--primary)" }}
                      ></i>
                    </span>
                  </div>
                  <input
                    id="state-input"
                    type="text"
                    className="form-control p-3"
                    placeholder="Select State"
                    style={{
                      border: "none",
                      borderRadius: "0 8px 8px 0",
                      fontSize: "16px",
                    }}
                  />
                </div>
              </div>

              {/* City Input with Default Dropdown + Autocomplete */}
              <div className="col-md-3 position-relative px-1">
                <div
                  className="input-group"
                  style={{
                    border: "1px solid var(--primary)",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    className="input-group-prepend"
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      borderRight: "1px solid var(--primary)",
                      borderRadius: "8px 0 0 8px",
                    }}
                  >
                    <span className="input-group-text border-0">
                      <i
                        className="fas fa-city"
                        style={{ color: "var(--primary)" }}
                      ></i>
                    </span>
                  </div>
                  <input
                    id="city-input"
                    type="text"
                    className="form-control p-3"
                    placeholder="Select City"
                    style={{
                      border: "none",
                      borderRadius: "0 8px 8px 0",
                      fontSize: "16px",
                    }}
                  />
                </div>
              </div>

              {/* Depart Date with Calendar Icon */}
              <div className="col-md-3 position-relative px-1">
                <div
                  className="input-group"
                  style={{
                    border: "1px solid var(--primary)",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    className="input-group-prepend"
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      borderRight: "1px solid var(--primary)",
                      borderRadius: "8px 0 0 8px",
                    }}
                  >
                    <span className="input-group-text border-0">
                      <i
                        className="fas fa-calendar-alt"
                        style={{ color: "var(--primary)" }}
                      ></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control p-3 datetimepicker-input"
                    placeholder="Depart Date"
                    data-target="#date1"
                    data-toggle="datetimepicker"
                    style={{
                      border: "none",
                      borderRadius: "0 8px 8px 0",
                      fontSize: "16px",
                    }}
                  />
                </div>
              </div>

              {/* Duration Dropdown with Timer Icon */}
              <div className="col-md-3 position-relative px-1">
                <div
                  className="input-group"
                  style={{
                    border: "1px solid var(--primary)",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    className="input-group-prepend"
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      borderRight: "1px solid var(--primary)",
                      borderRadius: "8px 0 0 8px",
                    }}
                  >
                    <span className="input-group-text border-0">
                      <i
                        className="fas fa-hourglass-half"
                        style={{ color: "var(--primary)" }}
                      ></i>
                    </span>
                  </div>
                  <select
                    className="custom-select px-4"
                    name="duration"
                    style={{
                      border: "none",
                      borderRadius: "0 8px 8px 0",
                      fontSize: "16px",
                    }}
                  >
                    <option selected>Duration</option>
                    <option value="1">1 to 3 days</option>
                    <option value="2">4 to 6 days</option>
                    <option value="3">7 to 9 days</option>
                    <option value="4">10 to 12 days</option>
                    <option value="5">13 days or more</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Advanced Filters (Initially Hidden) */}
            {showAdvancedFilters && (
              <div
                id="advanced-filters"
                className="row align-items-center mt-4 w-100"
              >
                <div className="col-md-3 px-1">
                  <div
                    className="input-group"
                    style={{
                      border: "1px solid var(--primary)",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      className="input-group-prepend"
                      style={{
                        background: "rgba(255, 255, 255, 0.9)",
                        borderRight: "1px solid var(--primary)",
                        borderRadius: "8px 0 0 8px",
                      }}
                    >
                      <span className="input-group-text border-0">
                        <i
                          className="fas fa-dollar-sign"
                          style={{ color: "var(--primary)" }}
                        ></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Price Range"
                      style={{
                        border: "none",
                        borderRadius: "0 8px 8px 0",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3 px-1">
                  <div
                    className="input-group"
                    style={{
                      border: "1px solid var(--primary)",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      className="input-group-prepend"
                      style={{
                        background: "rgba(255, 255, 255, 0.9)",
                        borderRight: "1px solid var(--primary)",
                        borderRadius: "8px 0 0 8px",
                      }}
                    >
                      <span className="input-group-text border-0">
                        <i
                          className="fas fa-suitcase-rolling"
                          style={{ color: "var(--primary)" }}
                        ></i>
                      </span>
                    </div>
                    <select
                      className="form-control"
                      style={{
                        border: "none",
                        borderRadius: "0 8px 8px 0",
                        fontSize: "16px",
                      }}
                    >
                      <option selected>Travel Type</option>
                      <option value="adventure">Adventure</option>
                      <option value="leisure">Leisure</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button and More Filters Button */}
            <div
              className="row w-100 align-items-center mt-3 mb-2 justify-content-center"
              id="button-group"
            >
              <div className="col-md-4 d-flex justify-content-center align-items-center px-1">
                <button
                  id="submit-btn"
                  className="btn btn-success mr-2 w-50"
                  style={{
                    height: "48px",
                    borderRadius: "8px",
                    backgroundColor: "var(--primary)",
                    borderColor: "var(--primary)",
                    color: "var(--light)",
                    fontSize: "16px",
                  }}
                >
                  <i className="fas fa-search mr-2"></i> Search
                </button>
                <button
                  id="filter-toggle"
                  className="btn btn-outline-primary w-50"
                  style={{
                    height: "48px",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                  onClick={toggleAdvancedFilters}
                >
                  <i className="fas fa-filter mr-2"></i>
                  <span id="filter-text">
                    {showAdvancedFilters ? "- Less Filters" : "+ More Filters"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Destination Start */}
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
            {[
              {
                img: "img/destination-1.jpg",
                title: "Kerala",
                subtitle: "God's Own Country",
              },
              {
                img: "img/destination-2.jpg",
                title: "Udaipur",
                subtitle: "City of Lakes",
              },
              {
                img: "img/destination-3.jpg",
                title: "Agra",
                subtitle: "Home of the Taj Mahal",
              },
              {
                img: "img/destination-4.jpg",
                title: "Goa",
                subtitle: "Beaches and Parties",
              },
              {
                img: "img/destination-5.jpg",
                title: "Jaipur",
                subtitle: "The Pink City",
              },
              {
                img: "img/destination-6.jpg",
                title: "Mysore",
                subtitle: "City of Palaces",
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
      </div>

      {/* Travel Tips Section */}
      <div className="container-fluid travel-tips my-5 py-4">
        <div className="container">
          <h2 className="text-center mb-5 text-primary">Travel Tips</h2>
          <div className="row">
            {[
              {
                icon: "fa-calendar-alt",
                text: "Best time to visit popular destinations is during the shoulder seasons for fewer crowds.",
              },
              {
                icon: "fa-cloud-sun",
                text: "Always check the local weather before you pack and plan your itinerary.",
              },
              {
                icon: "fa-money-bill-wave",
                text: "Make sure to carry local currency and a credit card for emergencies.",
              },
              {
                icon: "fa-handshake",
                text: "Research local customs and etiquette to enhance your travel experience.",
              },
              {
                icon: "fa-water",
                text: "Stay hydrated and take breaks when exploring to avoid exhaustion.",
              },
            ].map((tip, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div className="tip-card p-3">
                  <i className={`fa ${tip.icon} text-primary fa-lg me-3`}></i>
                  <span>{tip.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Destination;
