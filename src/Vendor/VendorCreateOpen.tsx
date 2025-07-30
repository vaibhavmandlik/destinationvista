import { Box, Typography, Grid } from "@mui/material";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  email,
  FileInput,
  FileField,
  useNotify,
  useRedirect,
  CreateBase,
} from "react-admin";

import mascotImage from "../assets/auth-register-multi-steps-illustration.png";

const validatePhoneNumber = (value: string) => {
  if (value && !/^\d{10}$/.test(value)) {
    return "Contact number must be 10 digits";
  }
  return undefined;
};

const validateGstNumber = (value: string) => {
  // Regex for Indian GST Number format: 15-digit alphanumeric code.
  // e.g., 22AAAAA0000A1Z5
  if (
    value &&
    !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$/i.test(
      value.toUpperCase()
    )
  ) {
    return "Invalid GST Number format. It should be a 15-digit alphanumeric code.";
  }
  return undefined;
};

const validatePanNumber = (value: string) => {
  // Regex for Indian PAN Card number format: 10-digit alphanumeric code.
  // e.g., ABCDE1234F
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
  if (value && !panRegex.test(value.toUpperCase())) {
    return "Invalid PAN Number format. It should be a 10-character alphanumeric code.";
  }
  return undefined;
};

const validateCinNumber = (value: string) => {
  // Regex for Indian Corporate Identity Number (CIN) format: 21-digit alphanumeric code.
  // e.g., U12345MH2021PTC123456
  const cinRegex = /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/i;
  if (value && !cinRegex.test(value.toUpperCase())) {
    return "Invalid Company Registration Number (CIN) format. It should be a 21-character alphanumeric code.";
  }
  return undefined;
};

const validateAccountNumber = (value: string) => {
  // Basic validation: check if it contains only numbers and is between 9 and 18 digits.
  const accountNumberRegex = /^\d{9,18}$/;
  if (value && !accountNumberRegex.test(value)) {
    return "Account number must be between 9 and 18 digits.";
  }
  return undefined;
};

const validateIfscCode = (value: string) => {
  // Regex for Indian IFSC Code format: 11 characters, e.g., SBIN0000123
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/i;
  if (value && !ifscRegex.test(value.toUpperCase())) {
    return "Invalid IFSC Code format. It should be an 11-character alphanumeric code.";
  }
  return undefined;
};

const validatePostalCode = (value: string) => {
  // Regex for Indian PIN Code format: 6-digit number.
  const postalCodeRegex = /^\d{6}$/;
  if (value && !postalCodeRegex.test(value)) {
    return "Postal code must be 6 digits";
  }
  return undefined;
};

const validateUpiId = (value: string) => {
  // UPI ID format: username@bank
  const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
  if (value && !upiRegex.test(value.toUpperCase())) {
    return "Invalid UPI ID format. It should be in username@bank format.";
  }
  return undefined;
};

function jsonToFormData(obj: any, form = new FormData(), namespace = "") {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const formKey = namespace ? `${namespace}[${key}]` : key;
      const value = obj[key];

      if (value?.rawFile instanceof File || value?.rawFile instanceof Blob) {
        // Directly append files
        form.append(formKey, value.rawFile);
      } else if (typeof value === "object" && value !== null) {
        // Recursively handle nested objects
        jsonToFormData(value, form, formKey);
      } else if (value !== undefined && value !== null) {
        // Append primitives (string, number, boolean)
        form.append(formKey, value);
      }
    }
  }
  return form;
}

export const VendorCreateOpen = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  // tokenAcess from url params
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get("accessToken");
  const userId = urlParams.get("userId");
  const onSubmit = async (data: any) => {
   const formData = jsonToFormData(data);

    // 3. Make the API call using fetch
    try {
      // IMPORTANT: Replace "undefined" with your actual authentication token.
      const authToken = accessToken;

      const response = await fetch(
        "https://destinationvista-backend.onrender.com/vendor",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
            // DO NOT set 'Content-Type'. The browser automatically sets it to
            // 'multipart/form-data' with the correct boundary when using FormData.
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        // Handle server-side errors
        throw new Error(
          result.error || `Request failed with status ${response.status}`
        );
      }

      handleSuccess();
      // Add any success logic here (e.g., show a success message, redirect)
    } catch (error:any) {
      console.error("Error submitting form:", error);
      notify(`Error: ${error.message}`, { type: "error" });
      // Add any error handling logic here (e.g., show an error message)
    }
  };

  const handleSuccess = () => {
    notify("Vendor created successfully. Logging out...", { type: "info" });
    redirect("/vendor/login");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        sx={{
          width: { md: "20%" },
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#F7F7F9",
          p: 2,
        }}
      >
        <Box
          component="img"
          src={mascotImage}
          alt="Mascot"
          sx={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box sx={{ p: 4, maxWidth: "600px", width: "100%" }}>
          <Box>
            <CreateBase
              resource="vendor"
              mutationOptions={{
                onSuccess: handleSuccess,
              }}
            >
              <SimpleForm onSubmit={onSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Agency Details
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextInput
                      source="agencyTitle"
                      label="Agency Name"
                      validate={[required()]}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextInput
                      source="managerName"
                      label="Manager Name"
                      validate={[required()]}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextInput
                      source="email"
                      validate={[required(), email()]}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextInput
                      source="contactNumber"
                      label="Contact Number"
                      validate={[required(), validatePhoneNumber]}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box mt={2}>
                      <Typography variant="h6" gutterBottom>
                        Identity Verification
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextInput
                      source="gstNumber"
                      label="GST Number"
                      validate={[required(), validateGstNumber]}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextInput
                      source="panNumber"
                      label="PAN Number"
                      validate={[required(), validatePanNumber]}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput
                      source="registrationNumber"
                      label="Company Registration Number"
                      validate={[required(), validateCinNumber]}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FileInput
                      source="panCardFile"
                      label="Upload PAN Card"
                      accept={{ "application/pdf": [], "image/*": [] }}
                      validate={[required()]}
                      fullWidth
                    >
                      <FileField source="src" title="title" />
                    </FileInput>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FileInput
                      source="aadhaarCardFile"
                      label="Upload Aadhaar Card"
                      accept={{ "application/pdf": [], "image/*": [] }}
                      validate={[required()]}
                      fullWidth
                    >
                      <FileField source="src" title="title" />
                    </FileInput>
                  </Grid>

                  <Grid item xs={12}>
                    <Box mt={2}>
                      <Typography variant="h6" gutterBottom>
                        Bank Information
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextInput
                      source="bank.accountHolderName"
                      label="Account Holder Name"
                      validate={[required()]}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextInput
                      source="bank.bankName"
                      label="Bank Name"
                      validate={[required()]}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextInput
                      source="bank.accountNumber"
                      label="Account Number"
                      validate={[required(), validateAccountNumber]}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextInput
                      source="bank.ifscCode"
                      label="IFSC Code"
                      validate={[required(), validateIfscCode]}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput
                      source="bank.upiId"
                      label="UPI ID (Optional)"
                      validate={[validateUpiId]}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box mt={2}>
                      <Typography variant="h6" gutterBottom>
                        Office Location
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextInput
                      source="office.addressLine1"
                      label="Address Line 1"
                      validate={[required()]}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextInput
                      source="office.addressLine2"
                      label="Address Line 2"
                      validate={[required()]}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextInput
                      source="office.city"
                      label="City"
                      validate={[required()]}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextInput
                      source="office.state"
                      label="State"
                      validate={[required()]}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput
                      source="office.postalCode"
                      label="Postal Code"
                      validate={[required(), validatePostalCode]}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </SimpleForm>
            </CreateBase>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
