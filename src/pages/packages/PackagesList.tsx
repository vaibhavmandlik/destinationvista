import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import PageHeader from "../pageheader/pageHeader";
import SearchBar from "../Searchbar/SearchBar";
import axios from "axios";
import {toast,ToastContainer } from "react-toastify";
import Spinner from "../../components/Loader/Spinner";
import { Button, Drawer, Box, Collapse } from "@mui/material";
import BookingForm from "./BookingForm"; 
import { AwardIcon } from "lucide-react";
const url = `${import.meta.env.VITE_API_URL}`;

// Define the `Package` type for type safety
type Package = {
  id: number | string ;
  title: string;
  description: string;
  price: string;
  imagePaths: string[];
};

interface TourPackagesProps {
  heading: string;
  subheading: string;
  packages: Package[]; // Array of package objects
  onDetailsBookNowClick: (pkg: Package) => void;
  onExploreMoreClick: () => void;
  isShowHeader?: boolean;
  isSearchBar?: boolean;
}

// Additional tour packages
const morePackages: Package[] = [
  {
    id: 5,
    title: "Goa Beach Tour",
    description:
      "Relax and unwind at the beautiful beaches of Goa, famous for its coastal beauty and vibrant nightlife.",
    price: "₹7,000",
    imagePaths: ["/img/goa.jpg"],
  },
  {
    id: 6,
    title: "Kerala Backwaters",
    description:
      "Explore the tranquil backwaters of Kerala in a houseboat cruise, amidst lush green landscapes.",
    price: "₹9,000",
    imagePaths: ["/img/kerla.jpeg"],
  },
];

const PackagesList: React.FC<TourPackagesProps> = ({
  heading,
  subheading,
  isShowHeader = true,
  isSearchBar = true,
}) => {
  const [packagesToShow, setPackagesToShow] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errortext, setError] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [morePackages , setMorePackages] = useState<Package[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchPackagesData = async ()=>{
      try {
        const response = await axios.get(`${url}/package`);
        setPackagesToShow(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch packages . Plaease try again');
        toast.error(errortext,{
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          theme: "light",
          pauseOnHover: true,
        });
        setLoading(false);
      }   
    };

    fetchPackagesData();
  },[]);

  // Redirect to the details page
  const onDetailsBookNowClick = (pkg : Package) => {
    navigate(`/packages/${pkg.id}`);
  };

  const handleBookNowClick = (pkg: Package) =>{
    setSelectedPackage(pkg);
    setIsDrawerOpen(true);
  }

  const handleCloseBookingForm = () => {
    setSelectedPackage(null);
    setIsDrawerOpen(false);
  };



  // Appends more packages to the list
  const onExploreMoreClick = async () => { 
    try {
      const start = packagesToShow.length + 1;
      const end = packagesToShow.length + 10;
      const token = localStorage.getItem('token');
      const response = await axios.get(`${url}/package?start=${start}&end=${end}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
      );

      if(response.status === 200)
      {
          setMorePackages(response.data);
          setPackagesToShow((prev)=>[...prev , ...morePackages]);
      }
    } catch (error) {
      setError('Failed to fetch packages . Plaease try again');
        toast.error(errortext,{
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          theme: "light",
          pauseOnHover: true,
        });
        setLoading(false);
    }
  };

  if (loading) return  <Spinner/>;
  if (errortext) return <ToastContainer/>;

  return (
    <>
      {/* not only visible on home page  */}
      {isShowHeader && (
        <PageHeader
          title="Packages"
          breadcrumb={[{ name: "Home", href: "/" }, { name: "Packages" }]}
        />
      )}
      {/* not only visible on home page  */}
      {isSearchBar && (
        <SearchBar
          onSearch={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}

      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          {/* Section Header */}
          <div className="text-center mb-3 pb-3">
            <h6
              className="text-primary text-uppercase"
              style={{ letterSpacing: "5px" }}
            >
              {subheading}
            </h6>
            <h1>{heading}</h1>
          </div>

         {/* Package crads showing*/}
          {packagesToShow.map((pkg)=>(
            <div 
            style={{
              width: "100%",
              height:"40ch",
              position: "relative",
              margin:'0'
            }}
          >
            
             <Box
              component="img"
              src={`${url}${pkg.imagePaths[0]}`}
              sx={{
                borderRadius:2,
                width: "30%",
                height: "70%",
                position: "absolute",
                top:'8%',
                left: `${Number(pkg.id) % 2 === 0 ? '58%' :'12%'}`,
                zIndex: "1",
              }}
            /> 
            
            <Box
              component="div"
              sx={{
                color:'#000',
                borderRadius:4,
                width: "50%",
                height:"35ch",
                boxShadow:4,
                position: "absolute",
                top: 0,
                left: `${Number(pkg.id) % 2 === 0 ? '10%' :'40%'}`,
                zIndex: `0`,
                p:5,
              }}
            >
              <p>
              <strong dangerouslySetInnerHTML={{__html : pkg.title}}/>
              </p>
              <Box sx={{overflow:'hidden',
                width:'50ch',
                height:'10ch'
              }} dangerouslySetInnerHTML={{__html: pkg.description}}>
                </Box>
              <p className="mt-2">
                <strong>
                 Price:{pkg.price}
                </strong>
              </p>
              <div>
              <Button sx={{m:1}} color="success" variant="outlined" onClick={()=>{onDetailsBookNowClick(pkg)}}>More Details</Button>
              <Button color="success" variant="contained" onClick={()=>{handleBookNowClick(pkg)}}>Book Now</Button>
              </div>
            </Box>
          </div>
          ))
          }
           

          {/* Explore More Packages Button */}
          <div className="text-center mt-4">
            <button
              className="btn btn-primary"
              onClick={onExploreMoreClick}
              style={{ padding: "10px 20px", fontWeight: "bold" }}
            >
              Explore More Packages
            </button>
          </div>
        </div>
      </div>

      <ToastContainer/>

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
                        zIndex: '1',
                        position:'absolute'  
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

      {/* Destination Section */}
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
          <div
            id="destinationCarousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              {[1, 2].map((_slide, idx) => (
                <div
                  className={`carousel-item ${idx === 0 ? "active" : ""}`}
                  key={idx}
                >
                  <div className="row">
                    {[
                      {
                        img: `img/destination-${3 * idx + 1}.jpg`,
                        title: "Rajasthan",
                        subtitle: "Where History Meet Grandure!",
                      },
                      {
                        img: `img/destination-${3 * idx + 2}.jpg`,
                        title: "Goa",
                        subtitle: "Your Escape To Paradise!",
                      },
                      {
                        img: `img/destination-${3 * idx + 3}.jpg`,
                        title: "Himachal",
                        subtitle: "Where The Hills Come Alive With Adventure!",
                      },
                      {
                        img: `img/destination-${3 * idx + 1}.jpg`,
                        title: "Rajasthan",
                        subtitle: "Where History Meet Grandure!",
                      },
                      {
                        img: `img/destination-${3 * idx + 2}.jpg`,
                        title: "Goa",
                        subtitle: "Your Escape To Paradise!",
                      },
                      {
                        img: `img/destination-${3 * idx + 3}.jpg`,
                        title: "Himachal",
                        subtitle: "Where The Hills Come Alive With Adventure!",
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackagesList;
