import React, { useEffect, useState } from "react";
import PageHeader from "../pageheader/pageHeader";
import SearchBar from "../Searchbar/SearchBar";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface DestinationProps {
  isShowHeader?: boolean;
}

const Destination: React.FC<DestinationProps> = ({ isShowHeader = true }) => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [topDestinations, setTopDestinations] = useState<any[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/destination`);
        if (response.status === 200) {
          setDestinations(response.data);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    const fetchTopDestinations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/destination/top`);
        if (response.status === 200) {
          setTopDestinations(response.data);
        }
      } catch (error) {
        console.error("Error fetching top destinations:", error);
      }
    };

    fetchDestinations();
    fetchTopDestinations();
  }, []);

  return (
    <>
      {/* Header */}
      {isShowHeader && (
        <PageHeader
          title="Destination"
          breadcrumb={[{ name: "Home", href: "/" }, { name: "destination" }]}
        />
      )}

      <SearchBar
        onSearch={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      {/* Top Destinations Section */}
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
            {topDestinations.length > 0 ? (
              topDestinations.map((destination, index) => (
                <div className="col-lg-4 col-md-6 mb-4" key={index}>
                  <div className="destination-item position-relative overflow-hidden mb-2">
                    <img
                      className="img-fluid"
                      src={
                        destination.imagePath
                          ? `${apiUrl}${destination.imagePath}`
                          : "/img/default-destination.jpg"
                      }
                      alt={destination.title}
                    />
                    <a
                      className="destination-overlay text-white text-decoration-none"
                      href={`/packages/${destination.id}`}
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
              <p className="text-center w-100">No top destinations available</p>
            )}
          </div>
        </div>
      </div>

      {/* All Destinations Section */}
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6
              className="text-primary text-uppercase"
              style={{ letterSpacing: "5px" }}
            >
              Destinations
            </h6>
            <h1>Explore All Destinations</h1>
          </div>
          <div className="row">
            {destinations.length > 0 ? (
              destinations.map((destination, index) => (
                <div className="col-lg-4 col-md-6 mb-4" key={index}>
                  <div className="destination-item position-relative overflow-hidden mb-2">
                    <img
                      className="img-fluid"
                      src={
                        destination.imagePath
                          ? `${apiUrl}${destination.imagePath}`
                          : "/img/default-destination.jpg"
                      }
                      alt={destination.title}
                    />
                    <a
                      className="destination-overlay text-white text-decoration-none"
                      href={`/packages/${destination.id}`}
                    >
                      <h5 className="text-white">{destination.title}</h5>
                      <span>{destination.description}</span>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-100">No destinations available</p>
            )}
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
