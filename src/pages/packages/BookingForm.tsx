import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface Passenger {
  name: string;
  age: number;
  gender: string;
  contact: string;
}
interface Package {
  title: string;
  description: string;
  price: string;
  imagePaths: string[];
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const isValid = passengers.every(
      (p) => p.name && p.age > 0 && p.gender && p.contact,
    );

    if (!isValid) {
      alert("Please fill out all passenger details correctly.");
      return;
    }

    console.log({ passengers, email });
    onClose();
  };

  // login redirect
  const handleLoginRedirect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default anchor behavior
    navigate("/loginPage");
  };
  return (
    <>
      {/* its not rendering  */}
      <div className="container-fluid py-5 bg-light ">
        <div className="container py-5">
          <h2 className="mb-4 text-center font-weight-bold text-dark">
            {pkg.title}
          </h2>
          <p className="text-center text-muted mb-4">
            Please{" "}
            <Link
              to="/loginPage"
              className="text-primary"
              onClick={handleLoginRedirect}
            >
              log in here
            </Link>{" "}
            to proceed with booking. Logging in is compulsory.
          </p>

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
                  <div className="form-group col-md-6">
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
                  <div className="form-group col-md-6">
                    <label>Age</label>
                    <input
                      type="number"
                      placeholder="Enter age"
                      min="1"
                      required
                      className="form-control"
                      value={passenger.age}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "age",
                          parseInt(e.target.value, 10),
                        )
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Gender</label>
                    <select
                      className="form-control"
                      required
                      value={passenger.gender}
                      onChange={(e) =>
                        handlePassengerChange(index, "gender", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
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
