import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  CardMedia,
} from "@mui/material";
import IndianStateDropdown from "./IndianStateDropdown";

const url = `${import.meta.env.VITE_API_URL}/user`;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  category: 0 | 1 | 2;
  pincode: number | string;
  primaryContactNumber: string;
  secondaryContactNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  landmark: string;
  dateOfBirth: string;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    category: 2,
    pincode: "",
    primaryContactNumber: "",
    secondaryContactNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    landmark: "",
    dateOfBirth: "",
  });

  const [state, setSelectState] = useState<string>("");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  const handleStateSelect = (state: string) => setSelectState(state);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!acceptTerms) {
      toast.error("You must accept Terms & Conditions before creating an account!");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const payload = { ...formData, state };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(`Welcome ${formData.firstName} ${formData.lastName}`);
        window.location.href = "/loginPage";
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Server connection failed.");
    }
  };

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right, #e3f2fd, #ffffff, #e3f2fd)",
          p: 2,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 1000,
            display: "flex",
            boxShadow: 8,
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {/* Left side image */}
          <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }}>
            <CardMedia
              component="img"
              image="https://i.pinimg.com/564x/a8/72/14/a872140102e7673359f30afcdf6083e4.jpg" // change this to your product image
              alt="Product highlight"
              sx={{
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* Right side form */}
          <Box sx={{ flex: 1.2, p: 3 }}>
            <CardHeader
              title={
                <Typography variant="h4" color="green" align="center" fontWeight="bold">
                  Create Account
                </Typography>
              }
              subheader={
                <Typography variant="body2" color="textSecondary" align="center">
                  Explore Dream Discover – Your next adventure awaits!
                </Typography>
              }
            />
            <CardContent>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  {/* First & Last Name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      helperText="Enter your given name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      helperText="Enter your surname"
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="email"
                      name="email"
                      label="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      helperText="We'll never share your email"
                    />
                  </Grid>

                  {/* Contact Numbers & DOB */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="primaryContactNumber"
                      label="Primary Number"
                      value={formData.primaryContactNumber}
                      onChange={handleInputChange}
                      helperText="Active mobile number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="secondaryContactNumber"
                      label="Secondary Number"
                      value={formData.secondaryContactNumber}
                      onChange={handleInputChange}
                      helperText="Optional"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="date"
                      name="dateOfBirth"
                      label="Date of Birth"
                      InputLabelProps={{ shrink: true }}
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      helperText="DD/MM/YYYY"
                    />
                  </Grid>

                  {/* Address */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="addressLine1"
                      label="Address Line 1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="addressLine2"
                      label="Address Line 2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="landmark"
                      label="Landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* City, State, Pincode */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="city"
                      label="City"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <IndianStateDropdown onStateSelect={handleStateSelect} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      name="pincode"
                      label="Postal Code"
                      value={formData.pincode}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Passwords */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      name="password"
                      label="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      helperText="At least 6 characters"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      name="confirmPassword"
                      label="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      helperText="Must match password"
                    />
                  </Grid>

                  {/* Terms */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                        />
                      }
                      label={
                        <Typography variant="body2">
                          I agree to the{" "}
                          <Link to="/terms" style={{ color: "#1976d2", fontWeight: 600 }}>
                            Terms & Conditions
                          </Link>
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>

                {/* Submit */}
                <CardActions sx={{ mt: 2, flexDirection: "column" }}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create Account
                  </Button>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Already have an account?{" "}
                    <Link to="/loginPage" style={{ color: "#1976d2", fontWeight: 600 }}>
                      Login
                    </Link>
                  </Typography>
                </CardActions>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default Registration;
