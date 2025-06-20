import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const url = `${import.meta.env.VITE_API_URL}`;

interface Passenger {
  name: string;
  age: number;
  gender: string;
  contact: string;
}
interface Package {
  id:number;
  title: string;
  description: string;
  price: string;
  imagePaths: string[];
}
interface Booking{
  packageId:number;
  bookingDate:string;
  totalPrice:number;
  totalSlots:number;
}
interface BookingFormProps {
  pkg: Package;
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ pkg, onClose }) => {
  const [numPassengers, setNumPassengers] = useState(1);
  const [passengers, setPassengers] = useState<Passenger[]>([
    { name: "", age: 0, gender: "", contact: "" },
  ]);
  const [email, setEmail] = useState("");
  // usenavigate to navigate
  const navigate = useNavigate();
  const [booking , setBooking] = useState<Booking>({
    packageId:pkg.id,
    bookingDate:new Date().toISOString().split('T')[0],
    totalPrice:Number(pkg.price),
    totalSlots:numPassengers
  });
  const handlePassengerChange = (
    index: number,
    field: keyof Passenger,
    value: string | number,
  ) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengers(updatedPassengers);
  };

  const addPassenger = () => {
    if (numPassengers < 10) {
      setNumPassengers(numPassengers + 1);
      setPassengers([
        ...passengers,
        { name: "", age: 0, gender: "", contact: "" },
      ]);
    }
  };

  const removePassenger = () => {
    if (numPassengers > 1) {
      setNumPassengers(numPassengers - 1);
      setPassengers(passengers.slice(0, -1));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
          toast.error("Email is required", {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            theme: "light",
            pauseOnHover: true,
          });
          return;
        }
      
        // Check if all passenger fields are filled (name, contact, etc.)
        for (let i = 0; i < passengers.length; i++) {
          const passenger = passengers[i];
          if (!passenger.name || !passenger.contact) {
            toast.error(`Passenger ${i + 1} is missing required fields. Please fill out all information.`, {
              position: "top-right",
              autoClose: 3000,
              closeOnClick: true,
              theme: "light",
              pauseOnHover: true,
            });
            return;
          }
        }
        const token = localStorage.getItem('token');
        if(!token)
        {
          toast.error("Please Login before booking your package",{
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    theme: "light",
                    pauseOnHover: true,
                  });
            navigate('/login');
            onClose();
        }

        try {
          setBooking({
            packageId:pkg.id,
            bookingDate:new Date().toISOString().split("T")[0],
            totalPrice:Number(pkg.price),
            totalSlots:numPassengers
            })
          const response = await axios.post<Booking>(`${url}/booking`,booking,
            {
              headers:{
                Authorization:`Bearer ${token}`,
              }
            }
            )

            if(response.status === 200)
            {
              toast.success("Your Package booked successfully",{
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                theme: "light",
                pauseOnHover: true,
              });
            }
        } catch (error) {
          console.log(error);
          toast.error("Failed to book yoour package",{
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    theme: "light",
                    pauseOnHover: true,
                  });
        }
  };

  return (
    <>
      {/* its not rendering  */}
      <div className="container-fluid py-5 bg-light ">
        <div className="container py-5">
          <h2 className="mb-4 text-center font-weight-bold text-dark">
            {pkg.title}{pkg.id}
          </h2> 

          <div className="bg-white p-5 rounded shadow-lg">
            <h4 className="mb-4 text-dark">Passenger Information</h4>
            <div className="d-flex align-items-center mb-4">
              <label
                htmlFor="numPassengers"
                className="mr-3 font-weight-bold"
                style={{ flex: "1" }}
              >
                Number of Passengers:
              </label>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm mr-2"
                onClick={removePassenger}
                disabled={numPassengers === 1}
                style={{
                  border: "solid 0.3px",
                  visibility: "visible", // Ensures the button is visible
                  opacity: 1, // Makes sure the button is fully opaque
                }}
              >
                -
              </button>
              <input
                type="number"
                id="numPassengers"
                value={numPassengers}
                readOnly
                className="form-control text-center"
                style={{ width: "60px" }}
              />
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm ml-2"
                style={{ border: "solid 0.3px" }}
                onClick={addPassenger}
                disabled={numPassengers === 10}
              >
                +
              </button>
            </div>

            {passengers.map((passenger, index) => (
              <div key={index} className="mb-4 passenger-section">
                <h5 className="text-dark">Passenger {index + 1}</h5>
                <div className="form-row">
                  <div className="form-group col">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      required
                      className="form-control"
                      value={passenger.name}
                      onChange={(e) =>
                        handlePassengerChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  
                </div>
                <div className="form-row">
                <div className="form-group col-md-6">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
                  <div className="form-group col-md-6">
                    <label>Contact Number</label>
                    <input
                      type="tel"
                      placeholder="Enter contact number"
                      required
                      className="form-control"
                      value={passenger.contact}
                      onChange={(e) =>
                        handlePassengerChange(index, "contact", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            <h4 className="text-dark">Payment Information</h4>
            <div className="form-row mb-3">
              
              <div className="form-group col-md-6">
                <label>Total Price</label>
                <input
                  type="text"
                  value={pkg.price}
                  readOnly
                  className="form-control font-weight-bold"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                className="btn btn-success btn-lg w-100 font-weight-bold"
              >
                Pay Now
              </button>
            </form>

            <button
              type="button"
              className="btn btn-primary btn-lg w-100 mt-2 font-weight-bold"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
