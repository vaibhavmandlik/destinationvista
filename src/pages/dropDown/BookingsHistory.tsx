import axios from "axios";
import React, { useEffect, useState } from "react";

// Get API URL from environment variables
const url = `${import.meta.env.VITE_API_URL}/user`;

// TypeScript Interface for Booking Data
interface Booking {
    packageId: number;
    totalPrice: number;
    totalSlots: number;
    bookedDate: string; // Store date as a string to prevent serialization issues
    status: 0 | 1 | 2; // Assuming 0 = Pending, 1 = Confirmed, 2 = Cancelled
}

const BookingsHistory: React.FC = () => {
    // State for storing data and errors
    const [data, setData] = useState<Booking[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                // Check if token exists
                if (!token) {
                    throw new Error("Unauthorized: No token found. Please log in.");
                }

                const response = await axios.get<Booking[]>(url);

                console.log("Response Data:", response.data); // Debugging log

                // Handle cases where response is empty
                if (response.status === 204 || !response.data.length) {
                    setError("No bookings found.");
                } else {
                    setData(response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 401) {
                        setError("Unauthorized: Please log in again.");
                    } else {
                        setError("Failed to fetch bookings. Please try again.");
                    }
                } else {
                    setError(error.message || "An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Call the function inside useEffect
    }, []);

    return (
        <div className="container shadow bg-white p-5 my-4" style={{ width: "160vh", height: "500px" }}>
            <p className="h2">My Bookings</p>

            <div className="card">
                <div className="card-body">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : data.length > 0 ? (
                        <ul>
                            {data.map((item) => (
                                <li key={item.packageId}>
                                    <strong>Package ID:</strong> {item.packageId} <br />
                                    <strong>Total Price:</strong> ₹{item.totalPrice} <br />
                                    <strong>Total Slots:</strong> {item.totalSlots} <br />
                                    <strong>Booked Date:</strong> {new Date(item.bookedDate).toLocaleDateString()} <br />
                                    <strong>Status:</strong> {item.status === 0 ? "Pending" : item.status === 1 ? "Confirmed" : "Cancelled"} <br />
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingsHistory;
