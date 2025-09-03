import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import PackageDetails from "./PackageDetails";
import axios from "axios";
import Spinner from "../../components/Loader/Spinner";

const url = `${import.meta.env.VITE_API_URL}/package`;

type DestinationDetails = {
  city_name: string;
};
// Define your package data
type PackageDetails = {
  id: number;
  title: string;
  description: string;
  price: number;
  durationDays: number;
  destination:string,
  availableSlots: number;
  imagePaths: [];
  approvedBy: null;
  approved: boolean;
  quickItinerary:string;
  itinerary:[];
  inclusion:string;
  exclusion:string;
  otherInfo:string;
  destinationDetails:DestinationDetails | null;
};

const mapApiDataToPacksgeDetails = (data: any): PackageDetails => ({
  id: data.id,
  title: data.title,
  description: data.description,
  price: Number(data.price),
  durationDays: data.durationDays,
  destination:data.destination,
  availableSlots: data.availableSlots,
  imagePaths: data.imagePaths,
  approvedBy: data.approvedBy,
  approved: data.approved,
  quickItinerary: data.quickItinerary,
  itinerary:data.itinerary,
  inclusion:data.inclusion,
  exclusion:data.exclusion,
  otherInfo:data.otherInfo,
  destinationDetails:data.destinationDetails || null,
});

const PackageDetailsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(
    null,
  );
  const [loading, setloading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      if (!id) {
        setError("Invalid Package Id");
        setloading(false);
        return;
      }

      try {
        const response = await axios.get(`${url}/${id}`);
       const modifiedData = {
        ...response.data,
        price: (Math.floor(Number(response.data.price)+ Number(response.data.price) * 0.10)), // keep it as string
      };
        setPackageDetails(mapApiDataToPacksgeDetails(modifiedData));
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
        setloading(false);
      }
    };
    fetchPackageDetails();
  }, [id]);

  const selectedPackage = packageDetails;

  if (loading) return <div className="text-center h4 m-3 p-5"> <Spinner/></div>;
  if (error) return <p>{error}</p>;
  if (!selectedPackage) return <Navigate to="/packages" />;
  return <PackageDetails {...selectedPackage} />;
};

export default PackageDetailsWrapper;
