import React, { useEffect, useState } from "react";
import { Button, Drawer, Box, Collapse } from "@mui/material";
import BookingForm from "./BookingForm"; // Ensure correct import path
import PageHeader from "../pageheader/pageHeader";
import Carousel from "bootstrap/js/dist/carousel";
const url = `${import.meta.env.VITE_API_URL}`;

// Define the types for the props
type PackageDetailsProps = {
  id: number;
  title: string;
  description: string;
  price: string;
  durationDays: number;
  destination: string;
  availableSlots: number;
  imagePaths: string[];
  approvedBy: null;
  approved: boolean;
  quickItinerary: string;
  itinerary: {
    title: string;
    description: string;
  }[]; // Updated to handle itinerary as objects
  inclusion: string;
  exclusion: string;
  otherInfo: string;
};

const PackageDetails: React.FC<PackageDetailsProps> = ({
  id,
  title,
  description,
  price,
  durationDays,
  destination,
  availableSlots,
  imagePaths,
  quickItinerary,
  itinerary,
  inclusion,
  exclusion,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    id:number;
    title: string;
    description: string;
    price: string;
    imagePaths: string[];
  } | null>(null);

  const handleOpenBookingForm = () => {
    setSelectedPackage({
      id,
      title,
      description,
      price,
      imagePaths,
    });
    setIsDrawerOpen(true);
  };

  const handleCloseBookingForm = () => {
    setSelectedPackage(null);
    setIsDrawerOpen(false);
  };

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const includedItems = inclusion ? inclusion.split("\n") : [];
  const excludedItems = exclusion ? exclusion.split("\n") : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeader
        title="Package Details"
        breadcrumb={[{ name: "Packages", href: "/" }, { name: "Details" }]}
      />

      <div className="container-fluid py-5 bg-light">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8">
              {/* Image and Details */}
              <div
                className="mb-5 carousel slide"
                id="carouselExampleControls"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {imagePaths.length > 0 &&
                    imagePaths.map((image, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${
                          index === 0 ? "active" : " "
                        } `}
                      >
                        <img src={`${url}/${image}`} 
                        className="img-fluid w-100 mb-4 rounded shadow-lg"
                        alt={title}
                        />
                      </div>
                    ))}
                </div>

                <Box>
                  <h2 className="mb-3 font-weight-bold text-dark">{title}</h2>
                  <Box sx={{mb:2}}>
                    <Collapse in={isDescriptionExpanded} collapsedSize={120}>
                    <div dangerouslySetInnerHTML={{__html:description}}/>
                    </Collapse>
                    {description.length > 300 && (
                      <Button size="small" onClick={toggleDescription}
                      sx={{textTransform:'none',mt:1}} color="success">
                      {isDescriptionExpanded ? "Read Less" : "Read More"}
                    </Button>
                    )}
                  </Box>

                  <div className="d-flex align-items-center mb-4">
                    <p className="h5 mb-0 mr-3">
                      <strong>Price:</strong> {price}
                    </p>
                    <p
                      className="h5 mb-0"
                      style={{ color: "#28a745", marginLeft: 10 }}
                    >
                      <strong>Seats Available:</strong> {availableSlots}
                    </p>
                  </div>
                </Box>

                {/* Highlights */}
                <Box sx={{ width: "90%", p: 2, boxShadow: 5, borderRadius: 5 }}>
                  <h4 className="mt-4 text-dark">Tour Highlights</h4>
                  <ul className="list-unstyled pl-3">
                    <li>
                      <i
                        className="fa fa-check-circle"
                        style={{ color: "#28a745", marginRight: 5 }}
                      ></i>
                      {quickItinerary}
                    </li>
                  </ul>
                </Box>

                {/* Itinerary */}
                <Box
                  sx={{
                    width: "90%",
                    mt: 4,
                    p: 2,
                    boxShadow: 5,
                    borderRadius: 5,
                  }}
                >
                  <h4 className="mt-4 text-dark">Itinerary</h4>
                  <div className="pl-3">
                    {itinerary === null
                      ? " "
                      : itinerary.map((item, index) => (
                          <div key={index} style={{ marginBottom: "1rem" }}>
                            <h5>
                              <strong>
                                Day {index + 1}: {item.title}
                              </strong>
                            </h5>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />
                          </div>
                        ))}
                  </div>
                </Box>

                {/* Includes */}
                <Box
                  sx={{
                    width: "90%",
                    mt: 4,
                    p: 2,
                    boxShadow: 5,
                    borderRadius: 5,
                  }}
                >
                  <h4 className="mt-4 text-dark">What's Included</h4>
                  <ul className="list-unstyled pl-3">
                    {includedItems.map((item, index) => (
                      <li key={index}>
                        <div className="d-flex ">
                        <i
                          className="fa fa-plus-circle"
                          style={{ color: "#28a745", marginRight: 5 }}
                          >
                        </i>
                       <div className="h6" dangerouslySetInnerHTML={{__html:item}}/>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Box>

                {/* Excludes */}
                <Box
                  sx={{
                    width: "90%",
                    mt: 4,
                    p: 2,
                    boxShadow: 5,
                    borderRadius: 5,
                  }}
                >
                  <h4 className="mt-4 text-dark">What's Excluded</h4>
                  <ul className="list-unstyled pl-3">
                    {excludedItems.map((item, index) => (
                      <li key={index}>
                        <div className="d-flex">
                        <i
                          className="fa fa-minus-circle"
                          style={{ color: "#28a745", marginRight: 5 }}
                          ></i>
                        <div className="h6" dangerouslySetInnerHTML={{__html:item}}/>
                        </div>
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
                    mt: 4,
                    px: 5,
                    py: 2,
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
                    <strong>Location:</strong> {destination}
                  </li>
                  <li>
                    <strong>Duration:</strong> {durationDays} Days
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
                 contact@destinationvista.in
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
              height: "100%",
              display: "flex",
              flexDirection: "column",
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
