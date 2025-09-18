import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Grid, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import {
  DateInput,
  Edit,
  email,
  ImageField,
  ImageInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput
} from "react-admin";

type CustomPasswordFieldProps = {
  source: string;
  validate?: any;
  label?: string; // ✅ make label optional
  [key: string]: any;
};

const CustomPasswordField = ({
  source,
  validate,
  label = "",
  ...rest
}: CustomPasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box>
      <TextInput
        source={source}
        label={label} // will default to ""
        validate={validate}
        type={showPassword ? "text" : "password"}
        fullWidth
        {...rest}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export const UserUpdate = () => {
  return (
    <Edit sx={{ maxWidth: 800, margin: "0 auto", marginTop: 2 }}>
      <SimpleForm>
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12} md={6}>
            <strong>First Name</strong>
            <TextInput fullWidth source="firstName" validate={[required()]} />
          </Grid>
          <Grid item xs={12} md={6}>
            <strong>Last Name</strong>
            <TextInput fullWidth source="lastName" validate={[required()]} />
          </Grid>

          {/* Email & Password */}
          <Grid item xs={12} md={6}>
            <strong>Email</strong>
            <TextInput
              fullWidth
              source="email"
              validate={[required(), email()]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <strong>Password</strong>
            <CustomPasswordField
              fullWidth
              source="password"
              validate={[required()]}
            />
          </Grid>

          {/* User Role */}
          <Grid item xs={12}>
            <strong>User Role</strong>
            <SelectInput
              fullWidth
              source="category"
              validate={[required()]}
              choices={[
                { id: "0", name: "Super Admin" },
                { id: "1", name: "Vendor" },
                { id: "2", name: "User" },
              ]}
            />
          </Grid>

          {/* Refer Code */}
          <Grid item xs={12} md={6}>
            <strong>Refer Code</strong>
            <TextInput fullWidth source="referCode" />
          </Grid>

          {/* Address */}
          <Grid item xs={12} md={6}>
            <strong>Address Line 1</strong>
            <TextInput fullWidth source="addressLine1" />
          </Grid>
          <Grid item xs={12} md={6}>
            <strong>Address Line 2</strong>
            <TextInput fullWidth source="addressLine2" />
          </Grid>
          <Grid item xs={12} md={6}>
            <strong>Landmark</strong>
            <TextInput fullWidth source="landmark" />
          </Grid>
          <Grid item xs={12} md={4}>
            <strong>City</strong>
            <TextInput fullWidth source="city" />
          </Grid>
          <Grid item xs={12} md={4}>
            <strong>State</strong>
            <TextInput fullWidth source="state" />
          </Grid>
          <Grid item xs={12} md={4}>
            <strong>Pincode</strong>
            <TextInput fullWidth source="pincode" />
          </Grid>

          {/* DOB */}
          <Grid item xs={12} md={6}>
            <strong>Date of Birth</strong>
            <DateInput fullWidth source="dateOfBirth" />
          </Grid>

          {/* Contact Numbers */}
          <Grid item xs={12} md={6}>
            <strong>Primary Contact</strong>
            <TextInput fullWidth source="primaryContactNumber" />
          </Grid>
          <Grid item xs={12} md={6}>
            <strong>Secondary Contact</strong>
            <TextInput fullWidth source="secondaryContactNumber" />
          </Grid>

          {/* Profile Image */}
          <Grid item xs={12}>
            <strong>Profile Image</strong>
            <ImageInput
              source="profileImagePath"
              accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
            >
              <ImageField source="src" />
            </ImageInput>
          </Grid>
        </Grid>
      </SimpleForm>
    </Edit>
  );
};
