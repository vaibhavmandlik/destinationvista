import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
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

// ✅ Environment variable
const apiUrl = import.meta.env.VITE_API_URL;
const userUrl = `${apiUrl}/user`;

// ----------------------------------------
// 📍 StateCityDropdown Component
// ----------------------------------------
interface Option {
  id: number;
  name: string;
}

interface StateCityProps {
  onStateSelect: (stateId: number) => void;
  onCitySelect: (cityId: number) => void;
  selectedStateId?: number | null;
  selectedCityId?: number | null;
  apiBaseUrl: string;
}

const StateCityDropdown: React.FC<StateCityProps> = ({
  onStateSelect,
  onCitySelect,
  selectedStateId = null,
  selectedCityId = null,
  apiBaseUrl,
}) => {
  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Fetch states
  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const res = await axios.get(`${apiBaseUrl}/common/state`);
        setStates(res.data);
      } catch (err) {
        console.error("Error fetching states:", err);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, [apiBaseUrl]);

  // Fetch cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedStateId) {
        setCities([]);
        return;
      }
      setLoadingCities(true);
      try {
        const res = await axios.get(`${apiBaseUrl}/common/city/${selectedStateId}`);
        setCities(res.data);
      } catch (err) {
        console.error("Error fetching cities:", err);
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, [selectedStateId, apiBaseUrl]);

  return (
    <>
      {/* State Dropdown */}
      <Grid item xs={12} sm={6}>
        <TextField
          select
          fullWidth
          SelectProps={{ native: true }}
          label="State"
          value={selectedStateId || ""}
          onChange={(e) => onStateSelect(Number(e.target.value))}
          focused
          required
          helperText="Select your state"
        >
          <option value="" disabled>
            {loadingStates ? "Loading states..." : "-- Select State --"}
          </option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </TextField>
      </Grid>

      {/* City Dropdown */}
      <Grid item xs={12} sm={6}>
        <TextField
          select
          className="form-control signup-input city-select"
          fullWidth
          SelectProps={{ native: true }}
          label="City"
          value={selectedCityId || ""}
          onChange={(e) => onCitySelect(Number(e.target.value))}
          focused
          disabled={!selectedStateId || loadingCities}
          required
          helperText="Select your city"
        >
          <option value="" disabled>
            {!selectedStateId
              ? "Select state first"
              : loadingCities
              ? "Loading cities..."
              : "-- Select City --"}
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </TextField>
      </Grid>
    </>
  );
};

// ----------------------------------------
// 📍 Registration Component
// ----------------------------------------
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  category: 0 | 1 | 2;
  pincode: string;
  primaryContactNumber: string;
  secondaryContactNumber: string;
  addressLine1: string;
  addressLine2: string;
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
    landmark: "",
    dateOfBirth: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [stateId, setStateId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!acceptTerms) return toast.error("Please accept the Terms & Conditions");
    if (!stateId || !cityId) return toast.error("Please select State and City");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (formData.password !== formData.confirmPassword)
      return toast.error("Passwords do not match!");

    try {
      const payload = { ...formData, state_id: stateId, city_id: cityId };
      const res = await axios.post(userUrl, payload);

      if (res.status === 200 || res.status === 201) {
        toast.success(`Welcome ${formData.firstName} ${formData.lastName}!`);
        setTimeout(() => (window.location.href = "/loginPage"), 1200);
      } else {
        toast.error("Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Server connection failed. Please try later.");
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
          {/* Left Image */}
          <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }}>
            <CardMedia
              component="img"
              image="https://i.pinimg.com/564x/a8/72/14/a872140102e7673359f30afcdf6083e4.jpg"
              alt="Register"
              sx={{ height: "100%", objectFit: "cover" }}
            />
          </Box>

          {/* Right Form */}
          <Box sx={{ flex: 1.2, p: 3 }}>
            <CardHeader
              title={
                <Typography variant="h4" align="center" color="green" fontWeight="bold">
                  Create Account
                </Typography>
              }
              subheader={
                <Typography variant="body2" align="center" color="textSecondary">
                  Explore Dream Discover – Your next adventure awaits!
                </Typography>
              }
            />

            <CardContent>
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* Names */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="firstName"
                      label="First Name"
                      fullWidth
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="lastName"
                      label="Last Name"
                      fullWidth
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email"
                      type="email"
                      fullWidth
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>

                  {/* Contact + DOB */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="primaryContactNumber"
                      label="Primary Contact"
                      fullWidth
                      value={formData.primaryContactNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="secondaryContactNumber"
                      label="Secondary Contact"
                      fullWidth
                      value={formData.secondaryContactNumber}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="dateOfBirth"
                      label="Date of Birth"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Address */}
                  <Grid item xs={12}>
                    <TextField
                      name="addressLine1"
                      label="Address Line 1"
                      fullWidth
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="addressLine2"
                      label="Address Line 2"
                      fullWidth
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="landmark"
                      label="Landmark"
                      fullWidth
                      value={formData.landmark}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* State & City Dropdown */}
                  <StateCityDropdown
                    apiBaseUrl={apiUrl}
                    selectedStateId={stateId}
                    selectedCityId={cityId}
                    onStateSelect={setStateId}
                    onCitySelect={setCityId}
                  />

                  {/* Pincode */}
                  <Grid item xs={12}>
                    <TextField
                      name="pincode"
                      label="Pincode"
                      type="number"
                      fullWidth
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>

                  {/* Passwords */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
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
                          <Link to="/terms" style={{ color: "#1976d2" }}>
                            Terms & Conditions
                          </Link>
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>

                {/* Submit */}
                <CardActions sx={{ mt: 2, flexDirection: "column" }}>
                  <Button variant="contained" color="primary" type="submit" fullWidth>
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
