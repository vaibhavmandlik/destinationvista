import React from "react";
import { useParams, Navigate } from "react-router-dom";
import PackageDetails from "./PackageDetails";

// Define your package data
const allPackages = [
  {
    id: 1,
    title: "Delhi City Tour",
    description: "Explore the vibrant city of Delhi.",
    price: "₹4,500",
    image: "/img/delhi.jpg",
    seatsAvailable: 20,
    highlights: ["India Gate", "Qutub Minar", "Red Fort"],
    itinerary: ["Arrival in Delhi", "City tour", "Departure"],
    included: ["Transport", "Guided tours"],
    excluded: ["Lunch", "Personal expenses"],
    location: "Delhi",
    duration: "2 days",
    bestTimeToVisit: "October to March",
    bookingLink: "/book/1",
  },
  {
    id: 2,
    title: "Mumbai City Tour",
    description:
      "Explore the vibrant city of Mumbai, known for its bustling streets, historic sites, and the iconic Gateway of India. Dive into the city's unique culture, enjoy delicious street food, and experience the energy of India’s financial capital.",
    price: "₹3,500 Per Person",
    image: "/img/mumbai-tour.jpg",
    seatsAvailable: 13,
    highlights: [
      " Visit the historic Gateway of India",
      "  Explore Marine Drive and Juhu Beach",
      "  Walk through the vibrant Crawford Market",
      "  Experience Bollywood magic at Film City",
      "  Delicious local street food tasting",
    ],
    itinerary: [
      " Arrival in Mumbai, visit Gateway of India, Colaba Causeway, and Marine Drive.",

      " Tour of Film City, Crawford Market, and a visit to Juhu Beach.",

      "Explore Elephanta Caves, shopping at Bandra, and depart from Mumbai.",
    ],
    included: [
      " Hotel accommodation (3-star) for 2 nights",
      " Breakfast and dinner included",
      " All transfers and sightseeing in an air-conditioned vehicle",
      " Local guide and entrance fees",
    ],
    excluded: [
      " Any tips and gratuities",
      "Lunches and personal expenses",
      
    ],
    location: "Mumbai",
    duration: "3 days 2 nights ",
    bestTimeToVisit: "November to February",
    bookingLink: "/book/2",
  },
  {
    id: 3,
    title: "Lonavala  Tour",
    description:
      "Escape to the beautiful hill station of Lonavala and enjoy breathtaking views, serene nature, and peaceful moments. Perfect for a weekend escape from the city hustle.",
    price: "₹5,000 Per Person",
    image: "/img/lonavla.jpg",
    seatsAvailable: 23,
    highlights: [
      "Explore the scenic Bhushi Dam",
      "  Visit Tiger Point and Rajmachi Point",
      "  Enjoy Lonavala's famous chikki",
    ],
    itinerary: [
      " Arrive in Lonavala, visit Bhushi Dam and Lonavala Lake.",

      " Sightseeing at Tiger Point, Rajmachi Point, and depart.",
    ],
    included: [
      " 1-night stay at a 3-star hotel",
      " Breakfast and dinner included",
      " All transfers and sightseeing in an air-conditioned vehicle",
      " Local guide and entrance fees",
    ],
    excluded: [
      " Any tips and gratuities",
      "Lunches and personal expenses",
      
    ],
    location: "Lonavala",
    duration: "1 day 1 nights ",
    bestTimeToVisit: "November to February",
    bookingLink: "/book/3",
  },
  // Add other packages here...
];

const PackageDetailsWrapper: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const packageIdNumber = parseInt(packageId || "", 10);

  // Find the package by ID
  const selectedPackage = allPackages.find((pkg) => pkg.id === packageIdNumber);

  // Redirect if the package is not found
  if (!selectedPackage) {
    return <Navigate to="/packages" />;
  }

  return <PackageDetails {...selectedPackage} />;
};

export default PackageDetailsWrapper;
