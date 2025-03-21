import React, { useState } from "react";
import { Button, Drawer, Box } from "@mui/material";
import BookingForm from "./BookingForm"; // Ensure correct import path
import PageHeader from "../pageheader/pageHeader";

// Define the types for the props
type PackageDetailsProps = {
  image: string;
  title: string;
  description: string;
  price: string;
  seatsAvailable: number;
  highlights: string[];
  itinerary: string[];
  included: string[];
  excluded: string[];
  location: string;
  duration: string;
  bestTimeToVisit: string;
  bookingLink: string;
};

const PackageDetails: React.FC<PackageDetailsProps> = ({
  image,
  title,
  description,
  price,
  seatsAvailable,
  highlights,
  itinerary,
  included,
  excluded,
  location,
  duration,
  bestTimeToVisit,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    title: string;
    description: string;
    price: string;
    image: string;
  } | null>(null);

  const handleOpenBookingForm = () => {
    setSelectedPackage({ title, description, price, image });
    setIsDrawerOpen(true);
  };

  const handleCloseBookingForm = () => {
    setSelectedPackage(null);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <PageHeader
        title="PackageDetails"
        breadcrumb={[{ name: "Packages", href: "/" }, { name: "details" }]}
      />
      <div className="container-fluid py-5 bg-light">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8">
              {/* Image and Details */}
              <div className="mb-5">
                <img
                  className="img-fluid w-100 mb-4 rounded shadow-lg"
                  src={image}
                  alt={title}
                />
                <Box >
                <h2 className="mb-3 font-weight-bold text-dark">{title}</h2>
                <p className="text-muted">{description}</p>

                <div className="d-flex align-items-center mb-4">
                  <p className="h5 mb-0 mr-3">
                    <strong>Price:</strong> {price}
                  </p>
                  <p className="h5 mb-0" style={{ color: "#28a745" }}>
                    <strong>Seats Available:</strong> {seatsAvailable}
                  </p>
                </div>
                </Box>

                {/* Highlights */}
                <Box sx={{width:'90%' , p:2 , boxShadow:5 , borderRadius:5}}>
                <h4 className="mt-4 text-dark">Tour Highlights</h4>
                <ul className="list-unstyled pl-3">
                  {highlights.map((highlight, index) => (
                    <li key={index}>
                      <i
                        className="fa fa-check-circle"
                        style={{ color: "#28a745", marginRight: 5 }}
                        ></i>
                      {highlight}
                    </li>
                  ))}
                </ul>
                </Box>

                {/* Itinerary */}
                <Box sx={{width:'90%', mt:4 , p:2 , boxShadow:5 , borderRadius:5}}>
                <h4 className="mt-4 text-dark">Itinerary</h4>
                <div className="pl-3">
                  {itinerary.map((day, index) => (
                    <p key={index}>
                      <strong>Day {index + 1}:</strong> {day}
                    </p>
                  ))}
                </div>
                </Box>
                
                {/* Includes and Excludes */}
                <Box sx={{width:'90%', mt:4 , p:2 , boxShadow:5 , borderRadius:5}}>
                <h4 className="mt-4 text-dark">What's Included</h4>
                <ul className="list-unstyled pl-3">
                  {included.map((item, index) => (
                    <li key={index}>
                      <i
                        className="fa fa-plus-circle"
                        style={{ color: "#28a745", marginRight: 5 }}
                      ></i>
                      {item}
                    </li>
                  ))}
                </ul>
                </Box>

                <Box sx={{width:'90%', mt:4 , p:2 , boxShadow:5 , borderRadius:5}}>
                <h4 className="mt-4 text-dark">What's Excluded</h4>
                <ul className="list-unstyled pl-3">
                  {excluded.map((item, index) => (
                    <li key={index}>
                      <i
                        className="fa fa-minus-circle"
                        style={{ color: "#28a745", marginRight: 5 }}
                      ></i>
                      {item}
                    </li>
                  ))}
                </ul>
                </Box>
                {/* Book Now Button */}
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleOpenBookingForm}
                  sx={{
                    mt:4,
                    px:5,
                    py:2
                  }}
                >
                  Book Now
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 mt-5 mt-lg-0">
              <div className="bg-white mb-5 p-4 rounded shadow-sm">
                <h4 className="text-uppercase text-dark mb-4">
                  Quick Information
                </h4>
                <ul className="list-unstyled">
                  <li>
                    <strong>Location:</strong> {location}
                  </li>
                  <li>
                    <strong>Duration:</strong> {duration}
                  </li>
                  <li>
                    <strong>Best Time to Visit:</strong> {bestTimeToVisit}
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="text-uppercase text-dark mb-4">
                  Need Assistance?
                </h4>
                <p>
                  Contact us for personalized assistance in planning your trip.
                </p>
                <p>
                  <i
                    className="fa fa-envelope mr-2"
                    style={{ color: "#28a745" }}
                  ></i>
                  info@destinationvista.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer for Booking Form */}
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={handleCloseBookingForm}
          sx={{
            "& .MuiDrawer-paper": {
              width: { xs: "100%", sm: 600 },
              height: "100%", // Ensure the drawer takes full height
              display: "flex",
              flexDirection: "column", // Align children vertically
            },
          }}
        >
          <Box
            sx={{
              padding: 2,
              overflowY: "auto",
              height: "100%",
              marginLeft: 1,
            }}
          >
            {selectedPackage && (
              <BookingForm
                pkg={selectedPackage}
                onClose={handleCloseBookingForm}
              />
            )}
          </Box>
        </Drawer>
      </div>
    </>
  );
};

export default PackageDetails;
