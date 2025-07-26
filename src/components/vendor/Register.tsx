// import React, { useRef, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { SubmitHandler, useForm, yup } from "react-hook-form";
// import { CustomTextInput } from "../common/CustomInputFields/TextInput";
// import { useCreate, useNotify, useRedirect } from "react-admin";
// import Button from "@mui/material/Button";
// import CheckIcon from "@mui/icons-material/Check";
// import { Cancel, Check } from "@mui/icons-material";
// export type FormInputVendorType = {
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   primaryContactNumber: string;
//   email: string;
//   password: string;
//   cpassword: string;
//   category: string;
//   addressLine1: string;
//   addressLine2: string;
//   landmark: string;
//   city: string;
//   state: string;
//   pincode: string;
//   secondaryContactNumber: string;
// };
// const Register = ({userType='2'}) => {
//   const notify = useNotify();
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormInputVendorType>();
//   const redirect = useRedirect();
//   const onSubmit: SubmitHandler<FormInputVendorType> = (data) => {
//     console.log(data);
//     const newData = {
//       ...data,
//       category: userType,
//     };
//     create(
//       "user",
//       { data: newData },
//       {
//         onSuccess: () => {notify("User Created Successfully", { type: "success" }); redirect("/vendor/login"); },
//         onError: (error:any) => {
//           notify(`Failed to create user: reason ${(error?.body?.error)}`, { type: "error" })},
//       }
//     );
//   };
//   const validateAge = (value: string) => {
//     const today = new Date();
//     const birthDate = new Date(value);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDifference = today.getMonth() - birthDate.getMonth();
//     if (
//       monthDifference < 0 ||
//       (monthDifference === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }
//     return age >= 18 || "You must be at least 18 years old";
//   };
//   const password = useRef({});
//   password.current = watch("password", "");
//   const [create, result] = useCreate();
//   return (
//     <div className="overflow-hidden">
//       <div style={{ padding: "0px !important" }}>
//         <div
//           style={{ height: "100vh" }}
//           className="d-flex justify-content-center align-items-center"
//         >
//           <div
//             className="row bg-white shadow rounded overflow-hidden"
//             style={{ maxWidth: "900px" }}
//           >
//             <div className="col-md-12 p-4">
//               <div className="text-center mb-4">
//                 <h2 className="text-primary">Destination Vista</h2>
//                 <p className="m-4 text-muted">Create Account</p>
//                 <hr />
//               </div>

//               <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="row ">
//                   <div className="col-md-6 mb-3">
//                     <CustomTextInput
//                       id="firstName"
//                       label="First Name"
//                       register={register("firstName", { required: "required" })}
//                       errors={errors.firstName && errors.firstName.message}
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <CustomTextInput
//                       id="lastName"
//                       label="Last Name"
//                       register={register("lastName", { required: "required" })}
//                       errors={errors.lastName && errors.lastName.message}
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <CustomTextInput
//                       id="addressLine1"
//                       label="address Line 1"
//                       register={register("addressLine1", {
//                         required: "required",
//                       })}
//                       errors={
//                         errors?.addressLine1 && errors?.addressLine1.message
//                       }
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <CustomTextInput
//                       id="addressLine2"
//                       label="address Line 2"
//                       register={register("addressLine2", {
//                         required: "required",
//                       })}
//                       errors={
//                         errors?.addressLine2 && errors?.addressLine2.message
//                       }
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <CustomTextInput
//                       id="landmark"
//                       label="landmark"
//                       register={register("landmark", {
//                         required: "required",
//                       })}
//                       errors={errors?.landmark && errors?.landmark.message}
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <CustomTextInput
//                       id="city"
//                       label="city"
//                       register={register("city", {
//                         required: "required",
//                       })}
//                       errors={errors?.city && errors?.city.message}
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <CustomTextInput
//                       id="state"
//                       label="state"
//                       register={register("state", {
//                         required: "required",
//                       })}
//                       errors={errors?.state && errors?.state.message}
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <CustomTextInput
//                       type="number"
//                       id="pincode"
//                       label="pincode"
//                       register={register("pincode", {
//                         required: "required",
//                         minLength: {
//                           value: 6,
//                           message: "pincode must be at least 6 characters long",
//                         },
//                       })}
//                       errors={errors?.pincode && errors?.pincode.message}
//                     />
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <CustomTextInput
//                       type="date"
//                       id="dateOfBirth"
//                       label="date Of Birth"
//                       register={register("dateOfBirth", {
//                         required: "required",
//                         validate: validateAge,
//                       })}
//                       errors={errors.dateOfBirth && errors.dateOfBirth.message}
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <CustomTextInput
//                       type="number"
//                       id="primaryContactNumber"
//                       label="Mobile Number"
//                       register={register("primaryContactNumber", {
//                         required: "required",
//                         minLength: {
//                           value: 10,
//                           message:
//                             "Mobile number must be at least 10 digit long",
//                         },
//                       })}
//                       errors={
//                         errors.primaryContactNumber &&
//                         errors.primaryContactNumber.message
//                       }
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <CustomTextInput
//                       type="number"
//                       id="secondaryContactNumber"
//                       label="Mobile Number 2"
//                       register={register("secondaryContactNumber", {
//                         required: "required",
//                         minLength: {
//                           value: 10,
//                           message:
//                             "Mobile number must be at least 10 digit long",
//                         },
//                       })}
//                       errors={
//                         errors.secondaryContactNumber &&
//                         errors.secondaryContactNumber.message
//                       }
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <CustomTextInput
//                       type="email"
//                       id="email"
//                       label="Email"
//                       register={register("email", {
//                         required: "required",
//                         pattern: {
//                           value:
//                             /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                           message: "Invalid email address",
//                         },
//                       })}
//                       errors={errors.email && errors.email.message}
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <CustomTextInput
//                       type="password"
//                       id="password"
//                       label="Password"
//                       register={register("password", {
//                         required: "required",
//                         minLength: {
//                           value: 8,
//                           message:
//                             "Password must be at least 8 characters long",
//                         },
//                         pattern: {
//                           value:
//                             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                           message:
//                             "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
//                         },
//                       })}
//                       errors={errors.password && errors.password.message}
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <CustomTextInput
//                       type="password"
//                       id="cpassword"
//                       label="Confirm Password"
//                       register={register("cpassword", {
//                         required: "required",
//                         validate: (value) =>
//                           value === password.current ||
//                           "The passwords do not match",
//                       })}
//                       errors={errors.cpassword && errors.cpassword.message}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-3 col-sm-12"></div>
//                   <div className="col-md-3 col-sm-12">
//                     {" "}
//                     <Button
//                       type="submit"
//                       disabled={result.isLoading}
//                       variant="contained"
//                       sx={{ width: "100%" }}
//                       startIcon={<Check />}
//                     >
//                       Signup
//                     </Button>
//                   </div>
//                   <div className="col-md-3 col-sm-12">
//                     <Button
//                       type="reset"
//                       color="warning"
//                       disabled={result.isLoading}
//                       variant="contained"
//                       sx={{ width: "100%" }}
//                       startIcon={<Cancel />}
//                     >
//                       reset
//                     </Button>
//                   </div>
//                   <div className="col-md-3 col-sm-12"></div>
//                 </div>

//                 {/* <button
                  
//                   type="submit"
//                   className="btn btn-primary w-100"
//                 >
//                   Sign up
//                 </button> */}
//               </form>
//               <p className="text-center mt-3 text-muted">
//                 Do you have an account?{" "}
//                 <a href="/vendor/login" className="text-primary">
//                   Login
//                 </a>
//               </p>
//             </div>
//             {/* 
//             <div className="col-md-6 mb-3 d-none d-md-flex align-items-center justify-content-center bg-light">
//               <img
//                 src="/register.png"
//                 alt="Register Illustration"
//                 className="img-fluid rounded"
//               />
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React from 'react';
import {
  AdminContext,
  Form,
  TextInput,
  PasswordInput,
  SaveButton,
  useNotify,
} from 'react-admin';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import mascotImage from './mascot.png'; // Make sure to add your mascot image

const RegistrationFormContent = () => {
  const notify = useNotify();

  const handleSubmit = (data) => {
    // The `data` object here is already validated by yup
    console.log('Form data submitted:', data);
    notify('Registration successful!', { type: 'success' });
    // Handle API call or other logic here
  };

  return (
    <Box component="form">
      <Form
        onSubmit={handleSubmit}
        // resolver={yupResolver(registrationSchema)}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextInput source="firstName" label="First Name" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput source="lastName" label="Last Name" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextInput source="address1" label="Address Line 1" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextInput source="address2" label="Address Line 2 (Optional)" fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextInput source="city" label="City" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextInput source="state" label="State" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextInput source="pincode" label="Pincode" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              source="dob"
              label="Date of Birth"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput source="mob1" label="Mobile Number 1" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextInput source="mob2" label="Mobile Number 2 (Optional)" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <PasswordInput
              source="password"
              label="Password"
              fullWidth
              required
              helperText="Password must be 8+ chars with uppercase, lowercase, number, and special character."
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordInput
              source="confirmPassword"
              label="Confirm Password"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <SaveButton
              label="Register"
              icon={<PersonAddIcon />}
              variant="contained"
              alwaysEnable
            />
          </Grid>
        </Grid>
      </Form>
    </Box>
  );
};

const RegistrationPage = () => {
  return (
    <AdminContext>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Desktop Left Side - Mascot */}
          <Grid
            item
            xs={false}
            md={4}
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            {/* <Box
              component="img"
              src={mascotImage}
              alt="Mascot"
              sx={{ width: '100%', height: 'auto' }}
            /> */}
          </Grid>

          {/* Right Side - Registration Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: { xs: 2, md: 5 }, borderRadius: 2 }}>
              {/* Header with Logo */}
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5" component="span" fontWeight="bold">
                  M
                </Typography>
                <Typography variant="h5" component="span" ml={1}>
                  Materialize
                </Typography>
              </Box>

              {/* Form Title */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight="bold">
                  Register Your Account
                </Typography>
                <Typography variant="body1">
                  Fill out the form below to create your account.
                </Typography>
              </Box>

              {/* React-Admin Form */}
              <RegistrationFormContent />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AdminContext>
  );
};

export default RegistrationPage;