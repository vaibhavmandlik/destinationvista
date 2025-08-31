import React from "react";
import { useLogin, useNotify } from "react-admin";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CustomTextInput } from "../../components/common/CustomInputFields/TextInput";
import { Login } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  CardMedia,
  FormHelperText,
} from "@mui/material";

const LoginPageAdmin: React.FC = () => {
  const login = useLogin();
  const notify = useNotify();

  type Input = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = (data) => {
    login(data).catch((error) => {
      notify(error.message || "Login failed", { type: "warning" });
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
        <Container maxWidth="xs">
          <Typography variant="h5" fontWeight="bold">
            Admin Sign In
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
            <FormHelperText sx={{ mb: 2 }}>
              Use the admin email provided by system administrator.
            </FormHelperText>

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
            <FormHelperText sx={{ mb: 2 }}>
              Password must be at least 8 characters long.
            </FormHelperText>

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
        </Container>
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
            Manage destinations, vendors, and bookings.
          </Typography>

          {/* Image */}
          <Box
            sx={{
              mt: 3,
              backgroundColor: "white",
              borderRadius: 3,
              padding: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: 3,
              maxWidth: 350,
              mx: "auto",
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image="/img/login.jpg" // ✅ fixed path
              alt="Destination Vista"
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPageAdmin;
