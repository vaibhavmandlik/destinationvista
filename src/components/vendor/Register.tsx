import {
  Box,
  Button,
  FormHelperText,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useCreate, useNotify, useRedirect } from "react-admin";
import { Controller, useForm } from "react-hook-form";
import mascotImage from "../../assets/auth-register-multi-steps-illustration.png";

const apiUrl = import.meta.env.VITE_API_URL;

// Common styles
const inputPropsStyle = {
  backgroundColor: "#fdfdfd",
  color: "#000",
  padding: "12px",
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

const Register = () => {
  const [create] = useCreate();
  const notify = useNotify();
  const redirect = useRedirect();
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState<any>({});

  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: formValues,
    mode: "onBlur",
  });

  // Field configurations for each step
  const stepsConfig = [
    {
      step: 1,
      fields: [
        {
          source: "firstName",
          label: "First Name",
          xs: 12,
          sm: 6,
          validate: (v: string) => (!!v ? true : "First Name is required"),
        },
        {
          source: "lastName",
          label: "Last Name",
          xs: 12,
          sm: 6,
          validate: (v: string) => (!!v ? true : "Last Name is required"),
        },
        {
          source: "dateOfBirth",
          label: "Date of Birth",
          type: "date",
          xs: 12,
          sm: 6,
          validate: (value: string) => {
            if (!value) return "Date of birth is required";
            const today = new Date();
            const dob = new Date(value);
            const age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            const dayDiff = today.getDate() - dob.getDate();
            const is18 =
              age > 18 ||
              (age === 18 &&
                (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
            return is18 ? true : "You must be at least 18 years old";
          },
          InputLabelProps: { shrink: true },
        },
      ],
    },
    {
      step: 2,
      fields: [
        {
          source: "email",
          label: "Email",
          xs: 12,
          validate: (v: string) =>
            /^\S+@\S+\.\S+$/.test(v || "") ? true : "Invalid email",
        },
        {
          source: "addressLine1",
          label: "Address Line 1",
          xs: 12,
          validate: (v: string) =>
            !!v
              ? /^[A-Za-z0-9\s.,'’/#\-]{5,100}$/.test(v || "")
                ? true
                : "Invalid address format. Please use only letters, numbers, spaces, commas, periods, slashes, or hyphens"
              : "Address Line 1 is required",
        },
        {
          source: "addressLine2",
          label: "Address Line 2",
          xs: 12,
          validate: (v: string) =>
            !v || /^[A-Za-z0-9\s.,'’/#\-]{5,100}$/.test(v)
              ? true
              : "Invalid address format. Please use only letters, numbers, spaces, commas, periods, slashes, or hyphens",
        },
        {
          source: "landmark",
          label: "Landmark",
          xs: 12,
          validate: (v: string) =>
            !v || /^[A-Za-z0-9\s,.'’/#\-]{3,50}$/.test(v)
              ? true
              : "Invalid landmark format. Please use only letters, numbers, spaces, and basic punctuation (e.g., “Near City Mall”, “Opposite Bus Stand”).",
        },
        {
          source: "state",
          label: "State",
          type: "select",
          xs: 12,
          sm: 4,
          options: states,
          validate: (v: string) => (!!v ? true : "State is required"),
        },
        {
          source: "city",
          label: "City",
          type: "select",
          xs: 12,
          sm: 4,
          options: cities,
          validate: (v: string) => (!!v ? true : "City is required"),
        },
        {
          source: "pincode",
          label: "Pincode",
          xs: 12,
          sm: 4,
          validate: (v: string) =>
            !!v
              ? /^\d{6}$/.test(v || "")
                ? true
                : "Pincode must be 6 digits"
              : "Pincode is required",
        },
        {
          source: "primaryContactNumber",
          label: "Mobile Number 1",
          xs: 12,
          sm: 6,
          validate: (v: string) =>
            /^[1-9]\d{9}$/.test(v)
              ? true
              : "Must be a valid 10-digit mobile number (not starting with 0)",
        },
        {
          source: "secondaryContactNumber",
          label: "Mobile Number 2",
          xs: 12,
          sm: 6,
          validate: (v: string) =>
            !v || /^[1-9]\d{9}$/.test(v)
              ? true
              : "Must be a valid 10-digit mobile number (not starting with 0)",
        },
      ],
    },
    {
      step: 3,
      fields: [
        {
          source: "password",
          label: "Password",
          type: "password",
          xs: 12,
          validate: (v: string) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(
              v || ""
            )
              ? true
              : "Password must be 8+ chars with uppercase, lowercase, number, and special character.",
        },
        {
          source: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          xs: 12,
          validate: (v: string, formValues: any) =>
            v === formValues.password ? true : "Passwords do not match",
        },
      ],
    },
  ];

  const handleNext = (values: any) => {
    setFormValues((prev: any) => ({ ...prev, ...values }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const submitForm = (values: any) => {
    const { confirmPassword, ...userData } = { ...formValues, ...values };
    create(
      "user",
      { data: { ...userData, category: 2 } },
      {
        onSuccess: () => {
          notify("User Created Successfully", { type: "success" });
          redirect("/vendor/login");
        },
        onError: (error: any) => {
          notify(`Failed to create user: ${error?.body?.error}`, {
            type: "error",
          });
        },
      }
    );
  };

  const renderStepForm = () => {
    const stepConfig = stepsConfig.find((s) => s.step === step);
    if (!stepConfig) return null;

    return (
      <form onSubmit={handleSubmit(step === 3 ? submitForm : handleNext)}>
        <Grid container spacing={3}>
          {stepConfig.fields.map((field: any) => (
            <Grid item xs={field.xs} sm={field.sm || 12} key={field.source}>
              <Controller
                name={field.source}
                control={control}
                rules={{
                  validate: (value) =>
                    typeof field.validate === "function"
                      ? field.validate(value, getValues())
                      : true,
                }}
                render={({ field: controllerField }) => (
                  <>
                    {field.type === "select" ? (
                      <TextField
                        {...controllerField}
                        select
                        label={field.label}
                        fullWidth
                        sx={inputStyle}
                        InputLabelProps={{
                          ...field.InputLabelProps,
                          style: labelStyle,
                        }}
                        InputProps={inputPropsStyle}
                        error={!!errors[field.source]}
                        onChange={(e) => {
                          controllerField.onChange(e);
                          if (field.source === "state") {
                            handleStateChange(e.target.value);
                          }
                        }}
                      >
                        {field.source === "state" &&
                          (field.options || []).map((opt: any) => (
                            <MenuItem key={opt.state_id} value={opt.state_id}>
                              {opt.state_name}
                            </MenuItem>
                          ))}

                        {field.source === "city" &&
                          (field.options || []).map((opt: any) => (
                            <MenuItem key={opt.city_id} value={opt.city_id}>
                              {opt.city_name}
                            </MenuItem>
                          ))}
                      </TextField>
                    ) : (
                      <TextField
                        {...controllerField}
                        label={field.label}
                        type={field.type || "text"}
                        fullWidth
                        sx={inputStyle}
                        InputLabelProps={{
                          ...field.InputLabelProps,
                          style: labelStyle,
                        }}
                        InputProps={inputPropsStyle}
                        error={!!errors[field.source]}
                      />
                    )}
                    {errors[field.source] && (
                      <FormHelperText error>
                        {errors[field.source].message as string}
                      </FormHelperText>
                    )}
                  </>
                )}
              />
            </Grid>
          ))}
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
            {step === 3 ? "Save" : "Next"}
          </Button>
        </Box>
      </form>
    );
  };

  // --- Fetch States ---
  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const res = await fetch(`${apiUrl}/common/state`);
        const data = await res.json();
        setStates(data || []);
      } catch (err) {
        console.error("Error fetching states:", err);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  // --- Fetch Cities (based on selected state) ---
  const handleStateChange = async (stateId: any) => {
    if (!stateId) {
      setCities([]);
      return;
    }
    setLoadingCities(true);
    try {
      const res = await fetch(`${apiUrl}/common/city/${stateId}`);
      const data = await res.json();
      setCities(data || []);
    } catch (err) {
      console.error("Error fetching cities:", err);
    } finally {
      setLoadingCities(false);
    }
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
          bgcolor: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
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
          Join our Vendor Portal and manage your business efficiently.
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
            <Typography variant="h5" fontWeight="bold" color="white">
              Vendor Registration
            </Typography>
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
                  width: `${(step / stepsConfig.length) * 100}%`,
                  height: "100%",
                  bgcolor: "#fff",
                  borderRadius: 2,
                  transition: "width 0.3s",
                }}
              />
            </Box>
          </Box>

          {renderStepForm()}

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Button component={Link} to="/vendor/login" variant="text">
                Login
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;
