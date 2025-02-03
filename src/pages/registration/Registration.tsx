import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import IndianStateDropdown from "./IndianStateDropdown";
const url = `${import.meta.env.VITE_API_URL}/user`;

// const Registration: React.FC = () => {
//   const [firstName, setFirstName] = useState<string>("");
//   const [lastName, setLastName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);

// const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();

//   if (password !== confirmPassword) {
//     setError("Passwords do not match!");
//     return;
//   }

//   setError(null);
//   alert(`Sign Up Successful! Welcome, ${firstName} ${lastName}.`);

//   // Reset the form
//   setFirstName("");
//   setLastName("");
//   setEmail("");
//   setPassword("");
//   setConfirmPassword("");

// };

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  category: 0 | 1 | 2;
  pincode: number;
  primaryContactNumber: string;
  secondaryContactNumber: string;
  addressLine1: string;
  addressLine2: string;
  city:string;
  landmark:string;
  dateOfBirth:string
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    category: 2,
    pincode: 0,
    primaryContactNumber: "",
    secondaryContactNumber: "",
    addressLine1: "",
    addressLine2: "",
    city:"",
    landmark:"",
    dateOfBirth:"",
  });

  const [state, setSelectState] = useState<string>("");
  const handleStateSelect = (state: string) => {
    setSelectState(state);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      category,
      pincode,
      primaryContactNumber,
      secondaryContactNumber,
      addressLine1,
      addressLine2,
      city,
      landmark,
      dateOfBirth
    } = formData;

    if(password.length < 6)
    {
      toast.error("password must be atleast 6 character ", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
        pauseOnHover: true,
      })
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password does not Match!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
        pauseOnHover: true,
      });
      return;
    }

    const payload = {
      firstName,
      lastName,
      email,
      password,
      category,
      addressLine1,
      addressLine2,
      state,
      pincode,
      primaryContactNumber,
      secondaryContactNumber,
      city,
      landmark,
      dateOfBirth
    };

    console.log(payload);

    try {
      const response = await fetch(url,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(payload),
      });

      if(response.ok){
        const data = await response.json();
        console.log('API response' , data);
        toast.success(`Account created successfully Welcome ${firstName} ${lastName}`,{
          position:'top-right',
          autoClose:3000,
          closeOnClick:true,
          theme:"light",
          pauseOnHover:true,
        })
        window.location.href="/loginPage"
      }
      else{
        const errorData = await response.json();
        console.error('Api Error :', errorData);
        toast.error(`Something went wrong. Please try again.`,{
          position:'top-right',
          autoClose:3000,
          closeOnClick:true,
          theme:"light",
          pauseOnHover:true,
        })

      }

    } catch (error) {
      console.error("Error :",error);
      toast.error(`Failed to connect to the server. Please try again later.`,{
        position:'top-right',
        autoClose:3000,
        closeOnClick:true,
        theme:"light",
        pauseOnHover:true,
      })
    }
  };

  return (
    // <div
    //   className="container d-flex justify-content-center align-items-center p-5"
    //   style={{ minHeight: "80vh" }}
    // >
    //   <div className="card p-4 shadow-lg" style={{ width: "500px" }}>
    //     <h3 className="text-center text-primary mb-4">
    //       Sign Up to Destination Vista
    //     </h3>
    //     <form id="signupForm" onSubmit={handleSubmit}>
    //       <div className="form-group">
    //         <label htmlFor="username">Full Name</label>
    //         <input
    //           type="text"
    //           id="username"
    //           className="form-control"
    //           placeholder="Enter your full name"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label htmlFor="email">Email</label>
    //         <input
    //           type="email"
    //           id="email"
    //           className="form-control"
    //           placeholder="Enter your email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label htmlFor="password">Password</label>
    //         <input
    //           type="password"
    //           id="password"
    //           className="form-control"
    //           placeholder="Enter your password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label htmlFor="confirmPassword">Confirm Password</label>
    //         <input
    //           type="password"
    //           id="confirmPassword"
    //           className="form-control"
    //           placeholder="Confirm your password"
    //           value={confirmPassword}
    //           onChange={(e) => setConfirmPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       {error && <p className="text-danger text-center">{error}</p>}
    //       <button type="submit" className="btn btn-primary btn-block">
    //         Sign Up
    //       </button>
    //       <p className="text-center mt-3">
    //         Already have an account? <Link to="/loginPage">Login</Link>
    //       </p>
    //       <p className="text-center mt-2">Or sign up with</p>
    //       <div className="text-center">
    //         <button type="button" className="btn btn-outline-primary mr-2">
    //           <i className="fab fa-facebook-f"></i> Facebook
    //         </button>
    //         <button type="button" className="btn btn-outline-danger">
    //           <i className="fab fa-google"></i> Google
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <>
      <ToastContainer />
      <div className="container py-3 ">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-md-center shadow-lg">
            <div className="col bg-dark signup-card">
              <div className="p-5 my-5">
                <h1 className="text-dark" style={{ fontSize: "45px" }}>
                  Destination <span className="text-primary">Vista</span>
                </h1>
                <h5 className="slogan">
                  Explore Dream Discover Your Next Adventure Awaits!
                </h5>
              </div>
            </div>
            <div className="col p-5 shadow-lg bg-primary">
              <h1 className="mx-auto" style={{ width: "300px" }}>
                Create account
              </h1>
              <div className="row">
                <div className="col my-1">
                  <label className="text-white mx-3">First name:</label>
                  <input
                    type="text"
                    className="form-control signup-input"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col my-1">
                  <label className="text-white mx-3">Last name:</label>
                  <input
                    type="text"
                    className="form-control signup-input"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="">
                <label className="text-white mx-3">Email:</label>
                <input
                  type="email"
                  className="form-control signup-input"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="row align-items-center">
                <div className="col my-1">
                  <label className="text-white mx-3">Primary Number:</label>
                  <input
                    type="text"
                    name="primaryContactNumber"
                    className="form-control signup-input"
                    placeholder="Primary contact number"
                    value={formData.primaryContactNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col my-1">
                  <label className="text-white mx-3">Secondary Number:</label>
                  <input
                    type="text"
                    name="secondaryContactNumber"
                    className="form-control signup-input"
                    placeholder="Secondary contact number"
                    value={formData.secondaryContactNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col my-1">
                  <label className="text-white mx-3">Date of <br />Birth:</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="form-control signup-input"
                    placeholder="dd/mm/yyyy"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="my-1">
                <label className="text-white mx-3">Address Line 1:</label>
                <input
                  type="text"
                  name="addressLine1"
                  className="form-control signup-input"
                  placeholder="Address Line 1"
                  onChange={handleInputChange}
                  required
                ></input>
              </div>
              <div className="my-1">
                <label className="text-white mx-3">Address Line 2:</label>
                <input
                  type="text"
                  name="addressLine2"
                  className="form-control signup-input"
                  placeholder="Address Line 2"
                  onChange={handleInputChange}
                  required
                ></input>
              </div>
              <div className="my-1">
                <label className="text-white mx-3">Landmark:</label>
                <input
                  type="text"
                  name="landmark"
                  className="form-control signup-input"
                  placeholder="Landmark"
                  onChange={handleInputChange}
                  required
                ></input>
              </div>
              <div className="row align-items-center">
                <div className="col">
                  <label className="mx-3 text-white">City:</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control signup-input"
                    placeholder="City"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col">
                  <label className="mx-3 text-white">State:</label>
                  <IndianStateDropdown
                    onStateSelect={handleStateSelect}
                    name={"state"}
                  />
                </div>
                <div className="col">
                  <label className="mx-3 text-white">Postal code:</label>
                  <input
                    type="number"
                    name="pincode"
                    className="form-control signup-input"
                    placeholder="Postal Code"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="my-1">
                <label className="text-white mx-3">Password :</label>
                <input
                  type="password"
                  className="form-control signup-input"
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="text-white mx-3">Confirm password :</label>
                <input
                  type="password"
                  className="form-control signup-input"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="m-auto p-3" style={{ width: "200px" }}>
                <button
                  type="submit"
                  className="btn btn-outline-light signup-input"
                >
                  Create account
                </button>
              </div>
              <div className="text-center text-dark">
                <p>
                  Already have an account ?{" "}
                  <Link to="/loginPage" className="text-white">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
