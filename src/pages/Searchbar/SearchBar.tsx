import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "./../Searchbar/SearchContext";
const apiUrl = import.meta.env.VITE_API_URL;

type SearchQuery = {
  state: string;
  city: string;
  startDate: string;
  duration: string;
};

const SearchBar: React.FC = () => {
  const { query, setQuery } = useSearch();
  const [cities, setCities] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [formData, setFormData] = useState(query);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${apiUrl}/common/city`);
        if (response.status === 200) setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    const fetchStates = async () => {
      try {
        const response = await axios.get(`${apiUrl}/common/state`);
        if (response.status === 200) setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchCities();
    fetchStates();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "state") {
      const fetchCitiesByState = async () => {
        try {
          const response = await axios.get(`${apiUrl}/common/city/${value}`);

          if (response.status === 200) setCities(response.data);
        } catch (error) {
          console.error("Error fetching cities by state:", error);
          setCities([]);
        }
      };

      fetchCitiesByState();
    }
  };

  const handleSearch = () => {
    const durationValue =
      formData.duration === "other"
        ? formData.customDuration
        : formData.duration;

    formData.customDuration = "";
    setQuery({
      ...formData,
      duration: durationValue,
    });

    navigate("/packages");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
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
              {/* State Dropdown */}
              <div className="col-md-3 px-1">
                <div
                  className="input-group"
                  style={{
                    border: "1px solid var(--primary)",
                    borderRadius: "8px",
                  }}
                >
                  <span className="input-group-text border-0">
                    <i
                      className="fas fa-map-marker-alt"
                      style={{ color: "var(--primary)" }}
                    ></i>
                  </span>
                  <select
                    className="form-control"
                    name="state"
                    value={formData.state || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select State</option>
                    {states.map((s) => (
                      <option key={s.state_id} value={s.state_id}>
                        {s.state_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* City Dropdown */}
              <div className="col-md-3 px-1">
                <div
                  className="input-group"
                  style={{
                    border: "1px solid var(--primary)",
                    borderRadius: "8px",
                  }}
                >
                  <span className="input-group-text border-0">
                    <i
                      className="fas fa-city"
                      style={{ color: "var(--primary)" }}
                    ></i>
                  </span>
                  <select
                    className="form-control"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select City</option>
                    {cities.map((c) => (
                      <option key={c.city_id} value={c.city_name}>
                        {c.city_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Input */}
              <div className="col-md-3 px-1">
                <div
                  className="input-group"
                  style={{
                    border: "1px solid var(--primary)",
                    borderRadius: "8px",
                  }}
                >
                  <span className="input-group-text border-0">
                    <i
                      className="fas fa-calendar-alt"
                      style={{ color: "var(--primary)" }}
                    ></i>
                  </span>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate || ""}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Duration Dropdown */}
              <div className="col-md-3 px-1">
                <div
                  className="input-group"
                  style={{
                    border: "1px solid var(--primary)",
                    borderRadius: "8px",
                  }}
                >
                  <span className="input-group-text border-0">
                    <i
                      className="fas fa-hourglass-half"
                      style={{ color: "var(--primary)" }}
                    ></i>
                  </span>

                  <select
                    className="form-control"
                    name="duration"
                    value={formData.duration || ""}
                    onChange={(e) => {
                      const { value } = e.target;
                      setFormData((prev) => ({
                        ...prev,
                        duration: value,
                      }));
                    }}
                  >
                    <option value="">Duration</option>
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Days
                      </option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Show numeric input if 'Other' is selected */}
                {formData.duration === "other" && (
                  <div className="input-group mt-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          customDuration: Math.max(
                            (prev.customDuration || 1) - 1,
                            1
                          ),
                        }))
                      }
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min={1}
                      className="form-control text-center"
                      value={formData.customDuration || 1}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          customDuration: Number(e.target.value),
                        }))
                      }
                    />

                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          customDuration: (prev.customDuration || 1) + 1,
                        }))
                      }
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="row w-100 mt-3">
              <div className="col text-center">
                <button
                  type="submit"
                  className="btn btn-success w-50"
                  style={{
                    height: "48px",
                    borderRadius: "8px",
                    backgroundColor: "var(--primary)",
                    borderColor: "var(--primary)",
                    color: "var(--light)",
                  }}
                >
                  <i className="fas fa-search mr-2"></i> Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
