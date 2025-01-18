import React from "react";
import PageHeader from "../pageheader/pageHeader";
import SearchBar from "../Searchbar/SearchBar";



interface DestinationProps {
  isShowHeader?: boolean;
}

const Destination: React.FC<DestinationProps> = ({ isShowHeader = true }) => {
  return (
    <>
      {/* <!-- Header Start --> */}

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
