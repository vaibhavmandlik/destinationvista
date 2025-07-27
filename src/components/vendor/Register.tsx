import { Box, Button, Grid, Typography } from "@mui/material";
import mascotImage from "../../assets/auth-register-multi-steps-illustration.png";
import {
  Link,
  PasswordInput,
  required,
  TextInput,
  regex,
  useCreate,
  useNotify,
  useRedirect,
  SimpleForm,
  email,
  CreateBase,
} from "react-admin";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Register = () => {
  const [create] = useCreate();
  const notify = useNotify();
  const redirect = useRedirect();

  const onSubmit = (data: any) => {
    const { confirmPassword, ...userData } = data;
    debugger;
    create("user", { data: { ...userData, category: 2 } }, {
      onSuccess: () => {
        notify("User Created Successfully", { type: "success" });
        redirect("/vendor/login"); 
      },
      onError: (error: any) => { notify(`Failed to create user: reason ${error?.body?.error}`, { type: "error" }) },
    });
  };

  const validatePassword = [
    required(),
    regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      'Password must be 8+ chars with uppercase, lowercase, number, and special character.'
    ),
  ];

  const validateConfirmPassword = (value: any, allValues: any) => {
    if (value !== allValues.password) {
      return 'The passwords do not match';
    }
    return undefined;
  };

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box
          sx={{
            width: { md: "20%" },
            display: { xs: "none", md: "flex" },
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#F7F7F9',
            p: 2,
          }}
        >
          <Box
            component="img"
            src={mascotImage}
            alt="Mascot"
            sx={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Box>

        {/* Right 80% screen on desktop, 100% on mobile */}
        <Box
          sx={{
            width: { xs: "100%", md: "80%" },
            p: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#FFFFFF',
          }}
        >
          <Box sx={{ p: 4, maxWidth: '600px', width: '100%' }}>
            <Box>
              <CreateBase resource="user">
                  <SimpleForm
                    onSubmit={onSubmit}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <PersonAddIcon sx={{ mr: 1 }} />
                      <Typography variant="h5">Vendor Register</Typography>
                    </Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextInput validate={required()} source="firstName" label="First Name" fullWidth />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextInput validate={required()} source="lastName" label="Last Name" fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <TextInput validate={[required(), email()]} source="email" label="Email" fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <TextInput validate={required()} source="addressLine1" label="Address Line 1" fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <TextInput validate={required()} source="addressLine2" label="Address Line 2" fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <TextInput source="landmark" validate={required()} label="Landmark" fullWidth />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextInput validate={required()} source="city" label="City" fullWidth />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextInput validate={required()} source="state" label="State" fullWidth />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextInput
                          validate={[required(), regex(/^\d{6}$/, 'Must be a 6 digit number')]}
                          source="pincode"
                          label="Pincode"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextInput
                          source="dateOfBirth"
                          label="Date of Birth"
                          type="date"
                          fullWidth
                          validate={required()}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextInput
                          validate={[required(), regex(/^\d{10}$/, 'Must be a 10 digit number')]}
                          source="primaryContactNumber"
                          label="Mobile Number 1"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextInput
                          source="secondaryContactNumber"
                          label="Mobile Number 2"
                          
                          validate={[required(),regex(/^\d{10}$/, 'Must be a 10 digit number')]}
                          fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <PasswordInput
                          source="password"
                          label="Password"
                          fullWidth
                          validate={validatePassword}
                          helperText="Password must be 8+ chars with uppercase, lowercase, number, and special character."
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <PasswordInput
                          source="confirmPassword"
                          label="Confirm Password"
                          fullWidth
                          validate={[required(), validateConfirmPassword]}
                        />
                      </Grid>
                    </Grid>
                  </SimpleForm>
                  </CreateBase>
                </Box>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" component="span">
                Do you have an account?{" "}
              </Typography>
              <Button component={Link} to="/vendor/login" variant="text">
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;
