import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import IndianStateDropdown from "./IndianStateDropdown";

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
  postalCode: number;
  contactNumber:string;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    category: 2,
    postalCode: 0,
    contactNumber:"",
  });

  const [selectState, setSelectState] = useState<string>("");
  const handleStateSelect = (state: string) => {
    setSelectState(state);
  };

  const [address, setAddress] = useState<string>("");
  const habdleTextAreaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(e.target.value);
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
      postalCode,
      contactNumber
    } = formData;

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

    toast.success(
      `Account created successfully Welcome ${firstName} ${lastName}`,
      {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
        pauseOnHover: true,
      },
    );

    const payload = {
      firstName,
      lastName,
      email,
      password,
      category,
      address,
      selectState,
      postalCode,
      contactNumber,
    };

    console.log(payload);
    // setTimeout(() => {
    //   window.location.href = "/loginPage";
    // }, 1000);

    // try {
    //   const response = await fetch("",{
    //     method:'POST',
    //     headers:{
    //       'Content-Type':'application/json',
    //     },
    //     body:JSON.stringify(payload),
    //   });

    //   if(response.ok){
    //     const data = await response.json();
    //     console.log('API response' , data);
    //     toast.success(`Account created successfully Welcome ${firstName} ${lastName}`,{
    //       position:'top-right',
    //       autoClose:3000,
    //       closeOnClick:true,
    //       theme:"light",
    //       pauseOnHover:true,
    //     })
    //     window.location.href="/loginPage"
    //   }
    //   else{
    //     const errorData = await response.json();
    //     console.error('Api Error :', errorData);
    //     toast.error(`Something went wrong. Please try again.`,{
    //       position:'top-right',
    //       autoClose:3000,
    //       closeOnClick:true,
    //       theme:"light",
    //       pauseOnHover:true,
    //     })

    //   }

    // } catch (error) {
    //   console.error("Error :",error);
    //   toast.error(`Failed to connect to the server. Please try again later.`,{
    //     position:'top-right',
    //     autoClose:3000,
    //     closeOnClick:true,
    //     theme:"light",
    //     pauseOnHover:true,
    //   })
    // }
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
      <div className="container p-5">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-md-center shadow-lg">
            <div className="col bg-white ">
              <div className="p-5 my-5">
                <h1 className="text-dark">Destination Vista</h1>
                <p className="slogan">
                  Explore Dream Discover Your Next Adventure Awaits!
                </p>
              </div>
            </div>
            <div className="col p-5 shadow-lg bg-primary">
              <h1 className="mx-auto" style={{ width: "300px" }}>
                Create account
              </h1>
              <div className="row">
                <div className="col my-2">
                  <label className="text-white mx-3">First name :</label>
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
                <div className="col my-2">
                  <label className="text-white mx-3">Last name :</label>
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
              <div className="my-2">
                <label className="text-white mx-3">Email :</label>
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
              <div className="my-2">
                <label className="text-white mx-3">Contact Number :</label>
                <input
                  type="text"
                  name="contactNumber"
                  className="form-control signup-input"
                  placeholder="Contact number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-2">
                <label className="text-white mx-3">Address :</label>
                <textarea
                  name="address"
                  className="form-control signup-input"
                  rows={1}
                  placeholder="Address"
                  onChange={habdleTextAreaInput}
                  required
                ></textarea>
              </div>
              <div className="row">
                <div className="col my-2">
                  <label className="mx-2 text-white">State :</label>
                  <IndianStateDropdown
                    onStateSelect={handleStateSelect}
                    name={"state"}
                  />
                </div>
                <div className="col my-2">
                  <label className="mx-2 text-white">Postal code:</label>
                  <input
                    type="number"
                    name="postalCode"
                    className="form-control signup-input"
                    placeholder="Postal Code"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="my-2">
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
              <div className="my-2">
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
