import {
  Create,
  SimpleForm,
  TextInput,
  required,
  email,
  PasswordInput,
} from "react-admin";
import { Box, Grid } from '@mui/material';
import { SelectInput } from "react-admin";
import React, { useState } from "react";
import {IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomPasswordField = ({ source, validate, label, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box>
      <TextInput
        source={source}
        label={label}
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

// export default CustomPasswordField;

export const UserCreate = () => {
  const inputStyles = {
    height: "56px", // Matches the default height of Material-UI inputs
    "& .MuiInputBase-root": {
      height: "100%", // Ensures inner input aligns with the height
    },
  };
  
  return (
    <Create sx={{ maxWidth: 600, margin: '0 auto', marginTop:2 }}>
      <SimpleForm>
        
        <Grid container spacing={2}>
          
          
          <Grid item xs={12} md={6}>
            <strong>First Name</strong>
            <TextInput sx={{ padding: '8.5px auto', height: '56px' }} label="" fullWidth source="firstName" variant="outlined" validate={[required()]} />
          </Grid>
          <Grid item xs={12} md={6}>
            <strong>Last Name</strong>
            <TextInput label="" fullWidth source="lastName" validate={[required()]} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <strong>Email</strong>
            <TextInput label="" fullWidth source="email" validate={[required(), email()]} />
          </Grid>
          <Grid item xs={12} md={6}>
            <strong>Password</strong>
            <CustomPasswordField
              label=""
              fullWidth
              source="password"
              validate={[required()]}
            />
          </Grid>
          <Grid item xs={12}>
            <strong>User Role</strong>
            <SelectInput 
              fullWidth
              label=""
              source="category"
              validate={[required()]}
              choices={[
                { id: "0", name: "Super Admin" },
                { id: "1", name: "Subscriber" },
                { id: "2", name: "User" },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <strong>Refer Code</strong>
            <TextInput label="" fullWidth source="referCode" validate={[required()]} />
          </Grid>
          <Grid item xs={12} md={6}>
            <strong>Created by</strong>
            <TextInput label="" fullWidth source="createdBy" validate={[required()]} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <strong>Updated By</strong>
            <TextInput label="" fullWidth source="updatedBy" validate={[required()]} />
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
