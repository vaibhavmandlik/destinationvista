import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const url = `${import.meta.env.VITE_API_URL}`;

interface Passenger {
  name: string,
  contact: string,
  email:string
}

interface Package {
  id: number;
  title: string;
  description: string;
  price: string;
  imagePaths: string[];
}

interface Booking {
  packageId: number;
  bookingDate: string;
  totalPrice: number;
  totalSlots: number;
}

interface BookingResponse{
    id: number
    packageId: number,
    bookingDate: string,
    totalPrice : number,
    totalSlots: number

}
interface BookingFormProps {
  pkg: Package;
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ pkg, onClose }) => {
  const [numPassengers, setNumPassengers] = useState(1);
  const [passengers, setPassengers] = useState<Passenger>();
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  
  const addPassenger = () => {
    if (numPassengers < 10) {
      setNumPassengers(numPassengers + 1);
    }
  };

  const removePassenger = () => {
    if (numPassengers > 1) {
      setNumPassengers(numPassengers - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email) {
    toast.error("Email is required");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login before booking your package");
    navigate("/loginpage");
    onClose();
    return;
  }

  const bookingData: Booking = {
    packageId: pkg.id,
    bookingDate: new Date().toISOString().split("T")[0],
    totalPrice: Number(pkg.price) * numPassengers,
    totalSlots: numPassengers,
  };

  try {
    const response1 = await axios.post<Booking>(
      `${url}/booking`,
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response1.status === 200) {
      debugger;
      const bookingId = response1.data.id;

      // Create order for Razorpay
      const response2 = await axios.post(
        `${url}/payments/order`,
        { bookingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response2.status === 200) {
        const { amount, currency, order_id, key } = response2.data;

        const options = {
          key: key, 
          amount: amount.toString(),
          currency,
          order_id: order_id,
          name: "Destination vista",
          description: "Package Booking Payment",
          handler: async function (response: any) {
            try {
              const verifyRes = await axios.post(
                `${url}/payments/verify`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  bookingId: bookingId,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (verifyRes.data.success) {
                toast.success("Payment successful and verified!");
                onClose(); 
                navigate("/home");
              } else {
                toast.error("Payment verification failed.");
              }
            } catch (err) {
              toast.error("Error verifying payment.");
              console.error(err);
            }
          },
          prefill: {
            name: "Passenger Name",
            email,
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();

      }
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to book your package");
  }
};


  return (
    <div className="container-fluid py-5 bg-light">
      <div className="container py-5">
        <h2 className="mb-4 text-center font-weight-bold text-dark">
          {pkg.title}
        </h2>

        <div className="bg-white p-5 rounded shadow-lg">
          <form onSubmit={handleSubmit}>
            <h4 className="mb-4 text-dark">Passenger Information</h4>

            <div className="form-group mb-3">
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

            <div className="d-flex justify-content-between gap-3">
              <div className="form-group mb-3">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="form-control"
                  // value={name}
                />
              </div>
              <div className="form-group mb-3">
                <label>Contact Number</label>
                <input
                  type="text"
                  placeholder="Contact Number"
                  required
                  className="form-control"
                  // value={contact}
                />
              </div>
            </div>

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
                onClick={addPassenger}
                disabled={numPassengers === 10}
              >
                +
              </button>
            </div>

            <h4 className="text-dark">Payment Information</h4>
            <div className="form-group col-md-6">
              <label>Total Price</label>
              <input
                type="text"
                value={(Math.floor(Number(pkg.price)+ Number(pkg.price) * 0.10)) * numPassengers}
                readOnly
                className="form-control font-weight-bold"
              />
            </div>

            <button
              type="submit"
              className="btn btn-success btn-lg w-100 font-weight-bold mt-3"
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
  );
};

export default BookingForm;
