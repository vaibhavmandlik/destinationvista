import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomTextInput } from "../common/CustomInputFields/TextInput";
import { useCreate } from "react-admin";
export type FormInputVendorType = {
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  mobileNo: string;
  email: string;
  password: string;
  cpassword: string;
};
const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputVendorType>();
  const onSubmit: SubmitHandler<FormInputVendorType> = (data) =>
  {
    console.log(data);
    create('user',{data})
  }
  const validateAge = (value: string) => {
    const today = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 18 || "You must be at least 18 years old";
  };
  const password = useRef({});
  password.current = watch("password", "");
  const [create,result]=useCreate()
  return (
    <div className="overflow-hidden">
      <div style={{ padding: "0px !important" }}>
        <div
          style={{ height: "100vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            className="row bg-white shadow rounded overflow-hidden"
            style={{ maxWidth: "900px" }}
          >
            <div className="col-md-12 p-4">
              <div className="text-center mb-4">
                <h2 className="text-primary">Destination Vista</h2>
                <p className="m-4 text-muted">Create Account</p>
                <hr/>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row ">
                  <div className="col-md-6 mb-3">
                    <CustomTextInput
                      id="firstName"
                      label="First Name"
                      register={register("firstName", { required: "required" })}
                      errors={errors.firstName && errors.firstName.message}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <CustomTextInput
                      id="lastName"
                      label="Last Name"
                      register={register("lastName", { required: "required" })}
                      errors={errors.lastName && errors.lastName.message}
                    />
                  </div>
                  <div className="col-md-6">
                    <CustomTextInput
                      id="address"
                      label="Address"
                      register={register("address", { required: "required" })}
                      errors={errors.address && errors.address.message}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <CustomTextInput
                      id="state"
                      label="state"
                      register={register("state", { required: "required" })}
                      errors={errors.state && errors.state.message}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <CustomTextInput
                      type="number"
                      id="postalCode"
                      label="postal Code"
                      register={register("postalCode", {
                        required: "required",
                        minLength: {
                          value: 6,
                          message:
                            "Postal code must be at least 6 characters long",
                        },
                      })}
                      errors={errors.postalCode && errors.postalCode.message}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <CustomTextInput
                      type="date"
                      id="dateOfBirth"
                      label="date Of Birth"
                      register={register("dateOfBirth", {
                        required: "required",
                        validate: validateAge,
                      })}
                      errors={errors.dateOfBirth && errors.dateOfBirth.message}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <CustomTextInput
                      type="number"
                      id="mobileNo"
                      label="Mobile Number"
                      register={register("mobileNo", {
                        required: "required",
                        minLength: {
                          value: 10,
                          message:
                            "Mobile number must be at least 10 digit long",
                        },
                      })}
                      errors={errors.mobileNo && errors.mobileNo.message}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <CustomTextInput
                      type="email"
                      id="email"
                      label="Email"
                      register={register("email", {
                        required: "required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email address",
                        },
                      })}
                      errors={errors.email && errors.email.message}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <CustomTextInput
                      type="password"
                      id="password"
                      label="Password"
                      register={register("password", {
                        required: "required",
                        minLength: {
                          value: 8,
                          message:
                            "Password must be at least 8 characters long",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                        },
                      })}
                      errors={errors.password && errors.password.message}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <CustomTextInput
                      type="password"
                      id="cpassword"
                      label="Confirm Password"
                      register={register("cpassword", {
                        required: "required",
                        validate: (value) =>
                          value === password.current ||
                          "The passwords do not match",
                      })}
                      errors={errors.cpassword && errors.cpassword.message}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Sign up
                </button>
              </form>
              <p className="text-center mt-3 text-muted">
                Don’t have an account?{" "}
                <a href="#" className="text-primary">
                  Login
                </a>
              </p>
            </div>
            {/* 
            <div className="col-md-6 mb-3 d-none d-md-flex align-items-center justify-content-center bg-light">
              <img
                src="/register.png"
                alt="Register Illustration"
                className="img-fluid rounded"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
