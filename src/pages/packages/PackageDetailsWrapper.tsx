import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import PackageDetails from "./PackageDetails";
import { toast } from "react-toastify";
import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/package`;

type PackageDetails = {
  id: number;
  title: string;
  description: string;
  price: string;
  durationDays: string;
  destination: string;
  availableSlots: number;
  imagePaths: string[];
};

// Map API response to match our type
const mapApiDataToPackageDetails = (data: any): PackageDetails => ({
  id: data.id,
  title: data.title,
  description: data.description,
  price: data.price,
  durationDays: data.durationDays || "",
  destination: data.destination || "",
  availableSlots: data.availableSlots || 0,
  imagePaths: data.imagePaths || [],
});

const PackageDetailsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const packageIdNumber = parseInt(id || "", 10);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      if (!id) {
        setError("Invalid package ID");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${url}/${id}`);
        setPackageDetails(mapApiDataToPackageDetails(response.data));
      } catch (error) {
        setError("Failed to fetch package details");
        toast.error("Failed to fetch package details", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          theme: "light",
          pauseOnHover: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]); // Added id as dependency

  const selectedPackage = packageDetails;

  if (loading) return <p>Loading package details...</p>;
  if (error) return <p>{error}</p>;
  if (!selectedPackage) return <Navigate to="/packages" />;

  return <PackageDetails {...selectedPackage} />;
};

export default PackageDetailsWrapper;
