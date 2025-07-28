import React from "react";
import { useLogin, useNotify } from "react-admin";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CustomTextInput } from "../../components/common/CustomInputFields/TextInput";
import { Login } from "@mui/icons-material";
import { Button, Container, Grid, Typography, Box, CardMedia,} from "@mui/material";
import { VendorNotFoundError } from "../../authProvider";
import { JSONTree } from "react-json-tree";

const MyLoginPage: React.FC = () => {
  const login = useLogin();
  const notify = useNotify();
  type Input = {
    email: string;
    password: string;
  };
  const [vendorHas, setVendorHas] = React.useState<boolean>(true);
  const [authData, setAuthData] = React.useState<any | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = (data) => {
    login(data).catch((error) => {
       if (error instanceof VendorNotFoundError) {
        debugger;
                setAuthData(error.authData);
                notify('Please complete your vendor profile to continue.', { type: 'info' });
                setVendorHas(false);
            } else {
                // Handle other generic login errors.
                notify(error.message || 'Login failed', { type: 'warning' });
            }
    });
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Side (Sign In Form) */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {vendorHas && <Container maxWidth="xs">
          <Typography variant="h5" fontWeight="bold">
            Vendor Sign In
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Don&apos;t have an account?{" "}
            <Link to="/open/vendorRegistration">Sign up</Link>
          </Typography>

          {/* Form Start */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <CustomTextInput
              label="Email address"
              placeholder="Enter your email"
              type="email"
              id="email"
              errors={errors.email && errors.email.message}
              register={register("email", { required: "Email is required" })}
            />

            {/* Password Field */}
            <CustomTextInput
              label="Password"
              placeholder="Enter your password"
              type="password"
              id="password"
              errors={errors.password && errors.password.message}
              register={register("password", {
                required: "Password is required",
              })}
            />

            {/* Forgot Password */}
            <Box sx={{ textAlign: "right", mt: 1 }}>
              <Link to="#">Forgot password?</Link>
            </Box>

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#635DFF",
                color: "#fff",
                width: "100%",
              }}
              startIcon={<Login />}
            >
            Sign in
            </Button>
          </form>
        </Container>}
        {!vendorHas && <Container maxWidth="xs">
          <Typography variant="h5" fontWeight="bold">
            Complete a Vendor Account
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            You need to complete your vendor registration to login.
            <Link to={`/open/agencyRegistration?accessToken=${authData?.accessToken}&userId=${authData?.id}`}>Start</Link>
          </Typography></Container>}
      </Grid>

      {/* Right Side (Illustration) */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "#0F172A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          padding: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
           <span style={{ color: "#43B581" }}>Destination Vista</span>
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            A Travel Friendly Website.
          </Typography>

          {/* Image Only */}
          <Box
  sx={{
    mt: 3,
    backgroundColor: "white", // White background
    borderRadius: 3, // Rounded corners (3 = 16px in Material UI)
    padding: 2, // Space around the image
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: 3, // Adds a subtle shadow
    maxWidth: 350, // Optional: Limits width
    mx: "auto", // Centers the box horizontally
  }}
>
  <CardMedia
    component="img"
    height="300"
    image="/public/img/login.jpg"
    alt="Destination Vista"
    sx={{ borderRadius: 2 }} // Slight rounding for the image itself
  />
</Box>

        </Box>
      </Grid>
    </Grid>
  );
};

export default MyLoginPage;
