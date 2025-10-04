import { Box, Button, Drawer, Typography } from "@mui/material";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../../components/Loader/Spinner";
import PageHeader from "../pageheader/pageHeader";
import SearchBar from "../Searchbar/SearchBar";
import { useSearch } from "./../Searchbar/SearchContext";
import BookingForm from "./BookingForm";

const url = `${import.meta.env.VITE_API_URL}`;

// Define the `Package` type for type safety
type Package = {
  id: number | string;
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
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const { query } = useSearch();

  useEffect(() => {
    const fetchPackagesData = async () => {
      try {
        let response;
        if (subheading === "") {
          // build query string from context
          const queryString = Object.keys(query)
            .filter((key) => query[key]) // skip empty values
            .map((key) => `${key}=${encodeURIComponent(query[key])}`)
            .join("&");

          response = await axios.get(
            `${url}/package${queryString ? `?${queryString}` : ""}`
          );
        } else {
          response = await axios.get(`${url}/package/top`);
        }
        setPackagesToShow(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch packages. Please try again");
        toast.error(errortext, {
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
  }, [query]); // 🔑 refetch whenever search query changes

  // Redirect to the details page
  const onDetailsBookNowClick = (pkg: Package) => {
    navigate(`/packages/${pkg.id}`);
  };

  const handleBookNowClick = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsDrawerOpen(true);
  };

  const handleCloseBookingForm = () => {
    setSelectedPackage(null);
    setIsDrawerOpen(false);
  };

  // Appends more packages to the list
  const onExploreMoreClick = async () => {
    if (subheading === "") {
      try {
        const start = packagesToShow.length + 1;
        const end = packagesToShow.length + 10;
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${url}/package?start=${start}&end=${end}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          const newPackages: Package[] = response.data;

          if (newPackages.length === 0) {
            setHasMore(false);
          } else {
            setPackagesToShow((prev) => [...prev, ...newPackages]);
          }
        }
      } catch (error) {
        setError("Failed to fetch packages . Plaease try again");
        toast.error(errortext, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          theme: "light",
          pauseOnHover: true,
        });
        setLoading(false);
      }
    } else {
      navigate(`/packages`);
    }
  };

  if (loading) return <Spinner />;
  if (errortext) return <ToastContainer />;

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
          {packagesToShow.map((pkg, index) => (
            <Box
              key={pkg.id}
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column", // 📱 mobile stacked
                  md: index % 2 === 0 ? "row" : "row-reverse", // 💻 desktop alternate
                },
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 2, md: 4 },
                my: 6,
              }}
            >
              {/* Package Image */}
              <Box
                component="img"
                src={`${url}${pkg.imagePaths[0]}`}
                alt={pkg.title}
                sx={{
                  borderRadius: 3,
                  width: { xs: "100%", md: "35%" },
                  height: { xs: "200px", md: "280px" },
                  objectFit: "cover",
                  boxShadow: 6,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 10,
                  },
                }}
              />

              {/* Package Details */}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 3,
                  width: { xs: "100%", md: "50%" },
                  minHeight: { xs: "auto", md: "260px" },
                  p: { xs: 2, md: 4 },
                  boxShadow: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  fontWeight="bold"
                  gutterBottom
                  dangerouslySetInnerHTML={{ __html: pkg.title }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    color: "text.secondary",
                  }}
                  dangerouslySetInnerHTML={{ __html: pkg.description }}
                />

                <Typography
                  variant="subtitle1"
                  sx={{ mt: 2, fontWeight: "bold", color: "success.main" }}
                >
                  Price: ₹
                  {Math.floor(Number(pkg.price) + Number(pkg.price) * 0.1)}
                </Typography>

                {/* Buttons */}
                <Box sx={{ mt: 2 }}>
                  <Button
                    sx={{ mr: 2 }}
                    color="success"
                    variant="outlined"
                    onClick={() => onDetailsBookNowClick(pkg)}
                  >
                    More Details
                  </Button>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => handleBookNowClick(pkg)}
                  >
                    Book Now
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}

          {/* Explore More Packages Button */}
          {hasMore ? (
            <div className="text-center mt-4">
              <button
                className="btn btn-primary"
                onClick={onExploreMoreClick}
                style={{ padding: "10px 20px", fontWeight: "bold" }}
              >
                Explore More Packages
              </button>
            </div>
          ) : (
            <Box
              sx={{
                textAlign: "center",
                mt: 6,
                p: 4,
                borderRadius: 3,
                background: "linear-gradient(135deg, #f5f7fa, #e6f4ea)",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BeachAccessIcon
                sx={{ fontSize: 50, color: "success.main", mb: 1 }}
              />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                You’ve all caught up!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No more packages to explore right now.
              </Typography>
            </Box>
          )}
        </div>
      </div>

      <ToastContainer />

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
            zIndex: "1",
            position: "absolute",
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
    </>
  );
};

export default PackagesList;
