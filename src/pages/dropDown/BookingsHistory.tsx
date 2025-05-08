import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';

// Get API URL from environment variables
const url = `${import.meta.env.VITE_API_URL}/booking`;

// TypeScript Interface for Booking Data
interface Booking {
    id:number;
    packageId: number;
    totalPrice: number;
    totalSlots: number;
    bookingDate: string; // Store date as a string to prevent serialization issues
    status: "0" | "1" | "2"; // Assuming 0 = Pending, 1 = Confirmed, 2 = Cancelled
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

                const response = await axios.get<Booking[]>(url,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    }
                });      
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
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Call the function inside useEffect
    }, []);

    return (
        <div className="container shadow bg-white p-5 my-4" style={{ width: "160vh"  }}>
            <p className="h2">My Bookings</p>            
                <div className="">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : data.length > 0 ? (
                        <ul>
                            {data.map((item) => (
                                 <div key={item.id} className="border rounded my-3">
                                 <div className="bg-cart p-2 d-flex justify-content-between align-items-center">
                                     <p className="mb-0">
                                     <strong className="fs-5 ">Package Id: {item.packageId}</strong> 
                                     </p>
                                     <p className="mb-0">
                                     <strong className="">Booking Date : <span>{dayjs(item.bookingDate).format("DD MMMM YYYY")}</span> </strong>
                                     </p>
                                 </div>
                                 <div className="d-flex justify-content-between  p-2 border-bottom border-right border-left rounded m-auto">
                                     <span>
                                     <strong>Status : </strong> <span className={item.status === "1" ? "text-success" : item.status === "2" ? "text-danger" : "text-warning"}> {item.status === "0" ? "Pending" : item.status === "1" ? "Confirmed" : "Cancelled"} </span>
                                     </span>
                                    <span>
                                    <strong>Total Price : </strong> {item.totalPrice}
                                     </span> 
                                     <span>
                                     <strong>Total Slots : </strong> {item.totalSlots} Seats 
                                     </span>
                                 </div>
                             </div>
                            ))}
                        </ul>
                    ) : (
                        <p>No bookings found.</p>
                    )}
                </div>
            </div>  
    );
};

export default BookingsHistory;
