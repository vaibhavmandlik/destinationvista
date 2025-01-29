import axios from "axios";
import React, { useEffect, useState } from "react";

const url = `${import.meta.env.VITE_API_URL}/user`;

interface Booking {
    packageId: number;
    totalPrice : number;
    totalSlots : number;
}

const BookingsHistory: React.FC = () => {
    const [data, setData] = useState<Booking[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Booking[]>(url ,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`,
                        'Content-Type':'application/json'
                    },
                    withCredentials:true,
                });
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call fetchData properly
    }, []);

    return (
        <div className="container shadow bg-white p-5 my-4" style={{ width: "160vh", height: "500px" }}>
            <p className="h2">My Bookings</p>
            <div className="card">
                <div className="card-body">
                    {data ? (
                        data.map((item) => (
                            <p key={item.packageId}>
                                <strong>{item.totalPrice}</strong> - {item.totalSlots}
                            </p>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingsHistory;
