import {
  Box,
  Button,
  FormHelperText,
  Grid,
  MenuItem,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNotify, useRedirect } from "react-admin";
import { Controller, useForm } from "react-hook-form";
import mascotImage from "../assets/auth-register-multi-steps-illustration.png";

const apiUrl = import.meta.env.VITE_API_URL ?? "";

// Common styles
const inputPropsStyle = {
  backgroundColor: "#fdfdfd",
  color: "#000",
  padding: "5px",
};
const inputStyle = {
  borderRadius: 1.5,
  "& .MuiOutlinedInput-input": { color: "#000" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#2575fc" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#6a11cb",
    borderWidth: 2,
  },
};
const labelStyle = { color: "#000" };

// Helper to read nested errors from react-hook-form (errors is nested)
const getError = (errors: any, path: string) =>
  path
    .split(".")
    .reduce((acc: any, key: string) => (acc ? acc[key] : undefined), errors);

const VendorCreateOpen = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [step, setStep] = useState<number>(1);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get("accessToken");

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // provide nested defaults so RHF initializes nested paths
      agencyTitle: "",
      managerName: "",
      email: "",
      contactNumber: "",
      gstNumber: "",
      panNumber: "",
      registrationNumber: "",
      panCardFile: null,
      aadhaarCardFile: null,
      bank: {
        accountHolderName: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        upiId: "",
      },
      office: {
        addressLine1: "",
        addressLine2: "",
        state: "",
        city: "",
        postalCode: "",
      },
    },
    mode: "onBlur",
  });

  // Validation functions
  const validatePhoneNumber = (value: string) =>
    !value
      ? "Contact number is required"
      : /^\d{10}$/.test(value)
      ? true
      : "Contact number must be 10 digits";
  const validateGstNumber = (value: string) =>
    !value
      ? "GST number is required"
      : /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$/i.test(value)
      ? true
      : "Invalid GST Number format.";
  const validatePanNumber = (value: string) =>
    !value
      ? "PAN number is required"
      : /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(value)
      ? true
      : "Invalid PAN Number format.";
  const validateCinNumber = (value: string) =>
    !value
      ? "Company registration number is required"
      : /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/i.test(value)
      ? true
      : "Invalid CIN format.";
  const validateAccountNumber = (value: string) =>
    !value
      ? "Account number is required."
      : /^\d{9,18}$/.test(value)
      ? true
      : "Account number must be 9-18 digits.";
  const validateIfscCode = (value: string) =>
    !value
      ? "IFSC code is required"
      : /^[A-Z]{4}0[A-Z0-9]{6}$/i.test(value)
      ? true
      : "Invalid IFSC Code. Must be 11 characters.";
  const validatePostalCode = (value: string) =>
    !value
      ? "Postal code is required"
      : /^\d{6}$/.test(value)
      ? true
      : "Postal code must be 6 digits";
  const validateUpiId = (value: string) =>
    !value
      ? true
      : /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(value)
      ? true
      : "Invalid UPI ID format.";

  // Convert JSON to FormData for file uploads
  function jsonToFormData(obj: any, form = new FormData(), namespace = "") {
    for (let key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
      const formKey = namespace ? `${namespace}[${key}]` : key;
      const value = obj[key];
      if (
        value instanceof File ||
        value?.rawFile instanceof File ||
        value?.rawFile instanceof Blob
      ) {
        // if it's a File or react-hook-form file wrapper
        form.append(
          formKey,
          value instanceof File ? value : value.rawFile ?? value
        );
      } else if (
        typeof value === "object" &&
        value !== null &&
        !(value instanceof Date)
      ) {
        jsonToFormData(value, form, formKey);
      } else if (value !== undefined && value !== null) {
        form.append(formKey, value);
      }
    }
    return form;
  }

  // Steps
  const steps = [
    "Agency Details",
    "Identity Verification",
    "Bank Information",
    "Office Location",
  ];

  // Step configs (step 1..4)
  const stepsConfig = [
    {
      step: 1,
      fields: [
        {
          source: "agencyTitle",
          label: "Agency Name",
          xs: 12,
          validate: (v: string) => (!!v ? true : "Agency title is required"),
        },
        {
          source: "managerName",
          label: "Manager Name",
          xs: 12,
          validate: (v: string) => (!!v ? true : "Manager name is required"),
        },
        {
          source: "email",
          label: "Business Email",
          xs: 12,
          validate: (v: string) =>
            !!v
              ? /^\S+@\S+\.\S+$/.test(v)
                ? true
                : "Invalid email"
              : "Email is required",
        },
        {
          source: "contactNumber",
          label: "Contact Number",
          xs: 12,
          validate: validatePhoneNumber,
        },
      ],
    },
    {
      step: 2,
      fields: [
        {
          source: "gstNumber",
          label: "GST Number",
          xs: 12,
          validate: validateGstNumber,
        },
        {
          source: "panNumber",
          label: "PAN Number",
          xs: 12,
          validate: validatePanNumber,
        },
        {
          source: "registrationNumber",
          label: "Company Registration Number",
          xs: 12,
          validate: validateCinNumber,
        },
        {
          source: "panCardFile",
          label: "Upload PAN Card",
          type: "file",
          xs: 12,
          sm: 4,
          validate: (v: any) =>
            v instanceof File ? true : "PAN card is required",
        },
        {
          source: "aadhaarCardFile",
          label: "Upload Aadhaar Card",
          type: "file",
          xs: 12,
          sm: 4,
          validate: (v: any) =>
            v instanceof File ? true : "Aadhaar card is required",
        },
      ],
    },
    {
      step: 3,
      fields: [
        {
          source: "bank.accountHolderName",
          label: "Account Holder Name",
          xs: 12,
          validate: (v: string) =>
            !!v ? true : "Account holder name is required",
        },
        {
          source: "bank.accountNumber",
          label: "Account Number",
          xs: 12,
          validate: validateAccountNumber,
        },
        {
          source: "bank.bankName",
          label: "Bank name",
          xs: 12,
          validate: (v: string) =>
            !!v ? true : "Bank name is required",
        },
        {
          source: "bank.ifscCode",
          label: "IFSC Code",
          xs: 12,
          validate: validateIfscCode,
        },
        {
          source: "bank.upiId",
          label: "UPI ID (Optional)",
          xs: 12,
          validate: validateUpiId,
        },
      ],
    },
    {
      step: 4,
      fields: [
        {
          source: "office.addressLine1",
          label: "Address Line 1",
          xs: 12,
          validate: (v: string) => (!!v ? true : "Address line 1 is required"),
        },
        {
          source: "office.addressLine2",
          label: "Address Line 2",
          xs: 12,
          validate: (v: string) => (!!v ? true : "Address line 2 is required"),
        },
        {
          source: "office.state",
          label: "State",
          type: "select",
          xs: 12,
          sm: 4,
          options: states,
          validate: (v: any) => (!!v ? true : "State is required"),
        },
        {
          source: "office.city",
          label: "City",
          type: "select",
          xs: 12,
          sm: 4,
          options: cities,
          validate: (v: any) => (!!v ? true : "City is required"),
        },
        {
          source: "office.postalCode",
          label: "Postal code",
          xs: 12,
          validate: validatePostalCode,
        },
      ],
    },
  ];

  // fetch states once
  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const res = await fetch(`${apiUrl}/common/state`);
        const data = await res.json();
        setStates(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching states:", err);
        notify("Failed to load states", { type: "warning" });
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch cities for selected state (when setValue('office.state') called)
  const handleStateChange = async (stateId: any) => {
    if (!stateId) {
      setCities([]);
      setValue("office.city", "");
      return;
    }
    setLoadingCities(true);
    try {
      const res = await fetch(`${apiUrl}/common/city/${stateId}`);
      const data = await res.json();
      setCities(Array.isArray(data) ? data : []);
      // reset city value
      setValue("office.city", "");
    } catch (err) {
      console.error("Error fetching cities:", err);
      notify("Failed to load cities", { type: "warning" });
    } finally {
      setLoadingCities(false);
    }
  };

  // When navigating to previous steps, ensure RHF fields are populated if you stored elsewhere.
  // (If you use local state to accumulate partial data, call reset with those defaults here.)
  // In this component we rely on RHF state directly (no separate formValues).

  // handle Next - receives validated values for current step
  const handleNext = (values: any) => {
    // values contains the current full form values; we just advance step
    setStep((prev) => Math.min(prev + 1, steps.length));
    // If user changed state in step 4 navigation we might want to fetch cities already
    // (not necessary here)
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  // final submit
  const submitForm = async (values: any) => {
    const formData = jsonToFormData(values);
    try {
      const response = await fetch(`${apiUrl}/vendor`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: formData,
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Failed to create vendor");
      notify("Vendor created successfully. Redirecting to login...", {
        type: "info",
      });
      redirect("/vendor/login");
    } catch (error: any) {
      notify(`Error: ${error.message}`, { type: "error" });
    }
  };

  // Render step content based on config
  const renderStepForm = () => {
    const stepConfig = stepsConfig.find((s) => s.step === step);
    if (!stepConfig) return null;

    // Submit handler: if last step -> final submit, else -> next
    const onSubmitHandler = step === steps.length ? submitForm : handleNext;

    return (
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container spacing={3}>
          {stepConfig.fields.map((field: any) => {
            const fieldError = getError(errors, field.source);
            const isSelect = field.type === "select";
            const isFile = field.type === "file";
            return (
              <Grid item xs={field.xs} sm={field.sm || 12} key={field.source}>
                <Controller
                  name={field.source}
                  control={control}
                  rules={{
                    validate: (value) => {
                      if (typeof field.validate === "function")
                        return field.validate(value, getValues());
                      return true;
                    },
                  }}
                  render={({ field: controllerField }) => (
                    <>
                      {isSelect ? (
                        <TextField
                          {...controllerField}
                          select
                          label={field.label}
                          fullWidth
                          sx={inputStyle}
                          InputLabelProps={{ style: labelStyle }}
                          InputProps={{ sx: inputPropsStyle }}
                          error={!!fieldError}
                          onChange={(e) => {
                            controllerField.onChange(e.target.value);
                            // handle state -> city cascade (field.source might be 'office.state')
                            if (
                              field.source.endsWith("office.state") ||
                              field.source === "office.state"
                            ) {
                              handleStateChange(e.target.value);
                            }
                          }}
                        >
                          {(field.source.endsWith("office.state")
                            ? states
                            : field.source.endsWith("office.city")
                            ? cities
                            : field.options || []
                          ).map((opt: any) => {
                            const id =
                              opt.id ??
                              opt.state_id ??
                              opt.city_id ??
                              opt.value;
                            const name =
                              opt.name ??
                              opt.state_name ??
                              opt.city_name ??
                              opt.label ??
                              opt.title;
                            return (
                              <MenuItem key={id} value={id}>
                                {name}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                      ) : isFile ? (
                        <>
                          <input
                            id={field.source}
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0] ?? null;
                              controllerField.onChange(file);
                            }}
                          />
                        </>
                      ) : (
                        <TextField
                          {...controllerField}
                          label={field.label}
                          type={field.type || "text"}
                          fullWidth
                          sx={inputStyle}
                          InputLabelProps={{ style: labelStyle }}
                          InputProps={{ sx: inputPropsStyle }}
                          error={!!fieldError}
                        />
                      )}

                      {fieldError && (
                        <FormHelperText error>
                          {(fieldError as any)?.message ?? fieldError}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </Grid>
            );
          })}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: step === 1 ? "flex-end" : "space-between",
            mt: 4,
          }}
        >
          {step > 1 && (
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{ px: 4, py: 1.5, borderRadius: 2 }}
            >
              Back
            </Button>
          )}

          <Button
            type="submit"
            sx={{
              background: "linear-gradient(135deg,#6a11cb,#2575fc)",
              color: "#fff",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              "&:hover": {
                background: "linear-gradient(135deg,#2575fc,#6a11cb)",
              },
            }}
          >
            {step === steps.length ? "Save" : "Next"}
          </Button>
        </Box>
      </form>
    );
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f0f2f5" }}>
      {/* Left Panel */}
      <Box
        sx={{
          width: { md: "40%" },
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          p: 5,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={mascotImage}
          alt="Mascot"
          sx={{
            position: "absolute",
            bottom: 0,
            right: -50,
            height: "90%",
            opacity: 0.15,
            pointerEvents: "none",
          }}
        />
        <Typography
          variant="h3"
          fontWeight="bold"
          align="center"
          sx={{ mb: 2, color: "#42c161" }}
        >
          Welcome!
        </Typography>
        <Typography variant="h6" align="center" sx={{ maxWidth: 280 }}>
          Complete your vendor profile step by step.
        </Typography>
      </Box>

      {/* Right Panel */}
      <Box
        sx={{
          width: { xs: "100%", md: "60%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: 6,
            borderRadius: 3,
            width: "100%",
            maxWidth: 700,
            bgcolor: "#42c161",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="white"
              align="center"
              sx={{ mb: 2 }}
            >
              Agency Registration
            </Typography>

            <Stepper activeStep={step - 1} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel sx={{ color: "white" }}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box
              sx={{
                mt: 2,
                height: 8,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.3)",
              }}
            >
              <Box
                sx={{
                  width: `${((step - 1) / (steps.length - 1)) * 100}%`,
                  height: "100%",
                  bgcolor: "#fff",
                  borderRadius: 2,
                  transition: "width 0.3s",
                }}
              />
            </Box>
          </Box>

          {renderStepForm()}
        </Paper>
      </Box>
    </Box>
  );
};

export default VendorCreateOpen;
