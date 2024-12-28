import React, { useState } from "react";
import TourPackages from "./TourPackages";
import { useNavigate } from "react-router-dom";

// Define the `Package` type for type safety
type Package = {
  id: string | number;
  title: string;
  description: string;
  price: string;
  image: string;
};

// Initial tour packages
const initialPackages: Package[] = [
  {
    id: 1,
    title: "Delhi City Tour",
    description:
      "Explore the vibrant city of Delhi, known for its bustling streets, historic sites, and the iconic India Gate.",
    price: "₹4,500",
    image: "/img/delhi.jpg",
  },
  {
    id: 2,
    title: "Mumbai City Tour",
    description:
      "Explore the vibrant city of Mumbai, known for its bustling streets, historic sites, and the iconic Gateway of India.",
    price: "₹3,500",
    image: "/img/mumbai-tour.jpg",
  },
  {
    id: 3,
    title: "Lonavala Weekend Getaway",
    description:
      "Enjoy a peaceful weekend amidst the scenic beauty of Lonavala, with mesmerizing views and tranquil surroundings.",
    price: "₹5,000",
    image: "/img/lonavla.jpg",
  },
  {
    id: 4,
    title: "Mahabaleshwar Nature Retreat",
    description:
      "Experience the beauty of Mahabaleshwar, known for its strawberry farms, waterfalls, and breathtaking landscapes.",
    price: "₹6,500",
    image: "/img/mahabaleshwar.jpg",
  },
];

// Additional tour packages
const morePackages: Package[] = [
  {
    id: 5,
    title: "Goa Beach Tour",
    description:
      "Relax and unwind at the beautiful beaches of Goa, famous for its coastal beauty and vibrant nightlife.",
    price: "₹7,000",
    image: "/img/goa.jpg",
  },
  {
    id: 6,
    title: "Kerala Backwaters",
    description:
      "Explore the tranquil backwaters of Kerala in a houseboat cruise, amidst lush green landscapes.",
    price: "₹9,000",
    image: "/img/kerla.jpeg",
  },
];

const PackagesList: React.FC = () => {
  const [packagesToShow, setPackagesToShow] = useState<Package[]>(initialPackages);
  const navigate = useNavigate();

  // Redirect to the details page
  const handleOpenBothForm = (pkg: Package) => {
    navigate(`/PackageDetails/${pkg.id}`);
  };

  // Appends more packages to the list
  const handleExploreMore = () => {
    setPackagesToShow((prevPackages) => [...prevPackages, ...morePackages]);
  };

  return (
    <>
     {/* <!-- Header Start --> */}
     <div className="container-fluid page-header" >
        <div className="container" style={{marginTop:"auto" , minHeight:"400px"}}>
          <div className="d-flex flex-column align-items-center justify-content-center " >
            <h3 className="display-4 text-white text-uppercase mt-5">PackageList</h3> 
            <div className="d-inline-flex text-white"  style={{marginTop:"200px" }}>
              <p className="m-0 text-uppercase">
                <a className="text-white" href="">
                  Home
                </a>
              </p>
              <i className="fa fa-angle-double-right pt-1 px-3"></i>
              <p className="m-0 text-uppercase">Packages</p>
            </div>
          </div>
        </div>
      </div>
      <TourPackages
        heading="Perfect Tour Packages"
        subheading="Packages"
        packages={packagesToShow}
        onDetailsClick={handleOpenBothForm}
        onBookNowClick={handleOpenBothForm}
        onExploreMoreClick={handleExploreMore}
      />
    </>
  );
};

export default PackagesList;
