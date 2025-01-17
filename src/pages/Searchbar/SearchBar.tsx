import React, { useState } from "react";

type SearchBarProps = {
  onSearch: (query: SearchQuery) => void;
};

type SearchQuery = {
  state: string;
  city: string;
  departDate: string;
  duration: string;
  priceRange?: string;
  travelType?: string;
};

const SearchBar: React.FC<SearchBarProps> = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] =
    useState<boolean>(false);

  // Handlers
  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  return (
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
  );
};

export default SearchBar;
