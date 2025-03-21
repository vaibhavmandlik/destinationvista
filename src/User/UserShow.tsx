import { Avatar, Card, CardContent, Grid } from "@mui/material";
import {
  EmailField,
  Show,
  ShowBase,
  SimpleShowLayout,
  useShowContext,
} from "react-admin";
import { CardHeader } from "react-bootstrap";
import { TextField, Button, Box, Typography } from "@mui/material";

const UserProfileShow = () => {
  const { record } = useShowContext();

  return (
    <div className="row mt-5">
      <div className="col-md-12">
        <h1>User Profile</h1>
      </div>
      <div className="col-md-6">
        {/* MUI card Profile Wedget with profile image and names and address */}
        <Card>
          <div className="row">
            <div className="col-md-4">
              <img
                src={record?.profileImage || "https://i.pravatar.cc/150"}
                alt="Profile"
              />
            </div>
            <div className="col-md-8">
              <h2>
                {record.firstName} {record.lastName}
              </h2>

              <p>{record.pincode}</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="col-md-6"></div>
    </div>
  );
};

const ProfileForm = () => {
  const { record } = useShowContext();
  const {
    id,
    firstName,
    lastName,
    email,
    addressLine1,
    addressLine2,
    landmark,
    city,
    state,
    pincode,
    dateOfBirth,
    primaryContactNumber,
    secondaryContactNumber,
  } = record;
  return (
    <Box sx={{ mx: "auto", p: 3 }}>
      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  alt={record.firstName}
                  src="https://i.pravatar.cc/150" // Replace with the actual path to the image
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h6">
                  #{id} {record?.firstName} {record?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {record.addressLine1 || "na"},{record.addressLine2},
                  {record.landmark},{record.city},{record.state}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  India
                </Typography>
                {/* <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                  Upload picture
                </Button> */}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Form Section */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Box component="form">
                <Grid container spacing={2}>
                  {/* Left Column */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="First name"
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      value={firstName}
                      disabled
                    />

                    <TextField
                      fullWidth
                       InputLabelProps={{ shrink: true }}
                      label="Email address"
                      variant="outlined"
                      margin="normal"
                      value={email}
                      disabled
                    />

                    <TextField
                      fullWidth
                       InputLabelProps={{ shrink: true }}
                      label="Alternate phone number"
                      variant="outlined"
                      margin="normal"
                      disabled
                      value={secondaryContactNumber}
                    />

                    <TextField
                      fullWidth
                       InputLabelProps={{ shrink: true }}
                      label="Address line 1"
                      variant="outlined"
                      margin="normal"
                      value={addressLine1}
                      disabled
                    />

                    <TextField
                      fullWidth
                       InputLabelProps={{ shrink: true }}
                      label="City"
                      variant="outlined"
                      margin="normal"
                      value={city}
                      disabled
                    />

                    <TextField
                      fullWidth
                       InputLabelProps={{ shrink: true }}
                      label="Landmark"
                      variant="outlined"
                      margin="normal"
                      value={landmark}
                      disabled
                    />
                  </Grid>

                  {/* Right Column */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                       InputLabelProps={{ shrink: true }}
                      label="Last name"
                      variant="outlined"
                      margin="normal"
                      value={lastName}
                      disabled
                    />

                    <TextField
                      fullWidth
                       InputLabelProps={{ shrink: true }}
                      label="Phone number"
                      variant="outlined"
                      margin="normal"
                      value={primaryContactNumber}
                        disabled
                    />

                    <TextField
                      fullWidth
                       InputLabelProps={{ shrink: true }}
                      label="Date of birth"
                      variant="outlined"
                      margin="normal"
                      value={dateOfBirth}
                      disabled
                    />

                    <TextField
                      fullWidth
                       InputLabelProps={{ shrink: true }}
                      label="Address line 2"
                      variant="outlined"
                      margin="normal"
                      value={addressLine2}
                      disabled
                    />

                    <TextField
                      fullWidth
                       InputLabelProps={{ shrink: true }}
                      label="State"
                      variant="outlined"
                      margin="normal"
                      value={state}
                      disabled
                    />

                    <TextField
                      fullWidth
                       InputLabelProps={{ shrink: true }}
                      label="Pincode"
                      variant="outlined"
                      margin="normal"
                      value={pincode}
                      disabled
                    />
                  </Grid>
                </Grid>

                {/* Save Button (if needed) */}
                {/* <Button variant="contained" fullWidth sx={{ mt: 2 }}>
          Save details
        </Button> */}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export const UserShow = () => (
  <ShowBase>
    <ProfileForm />
    {/* <SimpleShowLayout>
            
          
        </SimpleShowLayout> */}
  </ShowBase>
);
