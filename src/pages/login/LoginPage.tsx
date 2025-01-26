import React, { useState } from "react";
import { useLogin } from "react-admin";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CustomTextInput } from "../../components/common/CustomInputFields/TextInput";

const MyLoginPage: React.FC = () => {
  const login = useLogin();

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   // try {
  //   //   const response = await fetch('http://localhost:3000/api/login', {
  //   //     method: 'POST',
  //   //     headers: {
  //   //       'Content-Type': 'application/json',
  //   //     },
  //   //     body: JSON.stringify({ email, password }),
  //   //   });

  //   //   if (response.ok) {
  //   //     const data = await response.json();
  //   //     localStorage.setItem('token', data.token);
  //   //     alert('Login successful!');
  //   //     window.location.href = '/';
  //   //   } else {
  //   //     const errorData = await response.json();
  //   //     alert(`Login failed: ${errorData.message}`);
  //   //   }
  //   // } catch (error) {
  //   //   alert('An error occurred. Please try again later.');
  //   //   console.error('Error:', error);
  //   // }
  // };
  type Input = {
    email: string;
    password: string;
  };
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = (data) => {
    debugger;
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
          <h3 className="text-center text-primary mb-4">Login</h3>
            <div className="form-group">
              <CustomTextInput
                label="Email"
                placeholder="Enter your email"
                type="email"
                id="email"
                errors={errors.email && errors.email.message}
                register={register("email", { required: "Email is required" })} 
              />
            </div>
            <div className="form-group">
              <CustomTextInput
                label="Password"
                placeholder="Enter your password"
                type="password"
                id="password"
                errors={errors.password && errors.password.message}
                register={register("password", { required: "Password is required" })}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
            <p className="text-center mt-3">
              <a href="#">Forgot Password?</a>
            </p>
            <p className="text-center mt-2">Or login with</p>
            <div className="text-center">
              <button type="button" className="btn btn-outline-primary mr-2">
                <i className="fab fa-facebook-f"></i> Facebook
              </button>
              <button type="button" className="btn btn-outline-danger">
                <i className="fab fa-google"></i> Google
              </button>
            </div>
            <p className="text-center mt-3">
              Don’t have an account? <Link to="/registration">Sign Up</Link>
            </p>
        </div>
      </div>
    </form>
  );
};

export default MyLoginPage;
