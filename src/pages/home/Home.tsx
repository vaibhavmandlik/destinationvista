import React from "react";

import AboutUs from "../about/AboutUs";
import Contact from "../contact/Contact";
import Carousel from "../carousel/Carousel";


// import TourPackages from "../packages/TourPackages";
// import img5 from "../../img/destination-5.jpg";

const images = [
  {
    src : "/img/carousel-1.jpg",
    alt: "First slide"
  },
  {
    src :"/img/carousel-2.jpg",
    alt: "Second slide"
  },
  {
    src :"/img/carousel-1.jpg",
    alt: "third slide"
  }
];

const Home: React.FC = () => {
  return (
    <>
    
      <Carousel images={images}  />
      
       {/* <TourPackages
        heading="Perfect Tour Packages"
        subheading="Packages"       // gettting error whrn importing
        packages={packagesToShow}
        onDetailsClick={handleOpenBookingForm}
        onBookNowClick={handleOpenBookingForm}
        onExploreMoreClick={handleExploreMore}
      /> */}
      <AboutUs />
      <Contact />
      // Back to top button
     
   
    </>
  );
};

export default Home;
