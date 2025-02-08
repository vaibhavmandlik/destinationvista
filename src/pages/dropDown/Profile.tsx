import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { states } from "./states";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Select, InputLabel, FormControl } from "@mui/material";

const url = `${import.meta.env.VITE_API_URL}/user`;

interface ProfileDetails {
  firstName: string;
  lastName: string;
  email: string;
  primaryContactNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  pincode: string;
  landmark: string;
  state: string; // This will store the **value** (not label)
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("userid");
  const token = localStorage.getItem("token");

  const [data, setData] = useState<ProfileDetails | null>(null);
  const [formData, setFormData] = useState<ProfileDetails>({
    firstName: "",
    lastName: "",
    email: "",
    primaryContactNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
    landmark: "",
    state: "",
  });

  useEffect(() => {
    if (!id || !token) {
      toast.error("Unauthorized User", {
        position: "top-right",
        autoClose: 3000,
      });
      localStorage.clear();
      navigate("/loginpage");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const fetchedData = response.data;
          setData(fetchedData);
          setFormData({
            ...fetchedData,
            state: fetchedData.state, 
          });
        }
      } catch (error: any) {
        toast.error("Something went wrong. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/loginpage");
      }
    };

    fetchData();
  }, [id, token, navigate ]);

  const handleChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name as string]: e.target.value as string,
    });
  };

  console.log(formData);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${url}/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast.success("Profile updated successfully", { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Update failed. Please try again.", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="container bg-white my-3"
        style={{ width: "180vh", height: "100vh" }}
      >
        <p className="fs-1 p-5 text-dark">
          <strong>Your Profile</strong>
        </p>
        <div className="d-flex justify-content-center gap-1">
          <div className="col">
            <Box
              sx={{ p: 4 }}
              borderRadius={5}
              boxShadow={5}
              textAlign={"center"}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-tKwIjOYpL22jOrb4omh2-Uq4uQSsITFvtg&s"
                className="profile-picture"
              />
              <h2 className="my-2">{`${formData.firstName} ${formData.lastName}`}</h2>
              <p>{formData.email}</p>
              <p>{`${formData.addressLine1} ${formData.addressLine2}`}</p>
              <Button sx={{ width: "55ch" }} variant="text">
                Update profile picture
              </Button>
            </Box>
          </div>
          <div className="col">
            <Box
              border={0}
              boxShadow={5}
              borderRadius={5}
              sx={{ p: 3, width: "60ch" }}
            >
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <TextField
                  required
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <TextField
                  disabled
                  name="email"
                  label="Email"
                  value={formData.email}
                />
                <TextField
                  required
                  name="primaryContactNumber"
                  label="Contact number"
                  value={formData.primaryContactNumber}
                  onChange={handleChange}
                />
              </Box>
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "52ch" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  name="addressLine1"
                  label="Address Line 1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                />
                <TextField
                  required
                  name="addressLine2"
                  label="Address Line 2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                />
              </Box>
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  name="landmark"
                  label="Landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                />
                  <TextField
                    label="Select State"
                    select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    fullWidth
                  >
                    {states.map((state) => (
                      <MenuItem key={state.value} value={state.value}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </TextField>
  
                <TextField
                  required
                  name="city"
                  label="City"
                  value={formData.city}
                  onChange={handleChange}
                />
                <TextField
                  required
                  name="pincode"
                  label="Postal Code"
                  value={formData.pincode}
                  onChange={handleChange}
                />
                <Box textAlign={"center"}>
                  <Button sx={{ mt: 1 }} variant="contained" onClick={handleUpdate}>
                    Save Details
                  </Button>
                </Box>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
