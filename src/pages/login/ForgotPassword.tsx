import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  CardMedia,
  FormHelperText,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNotify } from "react-admin";

const apiUrl = import.meta.env.VITE_API_URL;

function ForgotPassword() {
  const location = useLocation();
  const { email } = location.state || {};
  const notify = useNotify();

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(0); // timer in seconds
  const [step, setStep] = useState(1); // 1 = Send OTP, 2 = Verify OTP, 3 = Reset Password

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // countdown logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  // format seconds -> mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleGenerateOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: any = await axios.post(`${apiUrl}/user/generate-otp`, {
        email,
      });

      if (response.status === 200) {
        notify("OTP Sent successfully");
        setStep(2); // move to OTP verification
        setTimeLeft(300); // 5 min timer
      } else if (response.success === false) {
        notify("User doesn't exist", { type: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyButton = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/user/verify-otp`, {
        email,
        otp,
      });

      if (response.status === 200) {
        notify("OTP Verified Successfully", { type: "success" });
        setOtp("");
        setStep(3); // move to password reset
      }
    } catch (error) {
      notify("Invalid OTP", { type: "error" });
      console.log(error);
    }
  };

const handlePasswordChange = async (e: React.FormEvent) => {
  e.preventDefault();

  // 1. Validate length
  if (newPassword.length < 6) {
    notify("Password must be at least 6 characters long", { type: "warning" });
    return;
  }

  // 2. Check confirm match
  if (newPassword !== confirmPassword) {
    notify("Passwords do not match", { type: "warning" });
    return;
  }

  try {
    const response = await axios.post(`${apiUrl}/user/reset-password`, {
      email,
      newPassword,
    });

    if (response.status === 200) {
      // 3. Optional: backend ensures new password ≠ old password
      if (response.data?.message === "New password must not be same as old") {
        notify("New password cannot be the same as the old password", { type: "error" });
        return;
      }
      notify("Password changed successfully!", { type: "success" });
      setNewPassword("");
      setConfirmPassword("");
      setStep(1); // back to Send OTP or redirect to login
    }
  } catch (error: any) {
    notify(
      error?.response?.data?.message || "Failed to reset password",
      { type: "error" }
    );
    console.log(error);
  }
};


  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Side (Form) */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xs">
          <Typography variant="h5" fontWeight="bold">
            {step === 1 && "Send OTP"}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Change Password"}
          </Typography>

          <form>
            {/* Email (always visible) */}
            <TextField
              label="Email address"
              type="email"
              fullWidth
              margin="normal"
              value={email || ""}
              InputProps={{ readOnly: true }}
            />

            {step === 1 && (
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#635DFF", color: "#fff", width: "100%" }}
                onClick={handleGenerateOTP}
              >
                Send OTP
              </Button>
            )}

            {step === 2 && (
              <>
                <TextField
                  label="OTP"
                  placeholder="Enter your OTP"
                  type="text"
                  fullWidth
                  margin="normal"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <FormHelperText sx={{ mb: 2 }}>
                  Please enter the OTP that was sent to your mail!
                </FormHelperText>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, backgroundColor: "#635DFF", color: "#fff", width: "100%" }}
                  onClick={handleVerifyButton}
                >
                  Verify OTP
                </Button>

                {timeLeft > 0 ? (
                  <Typography sx={{ mt: 2, textAlign: "center" }} color="text.secondary">
                    Resend OTP in {formatTime(timeLeft)}
                  </Typography>
                ) : (
                  <Button
                    variant="outlined"
                    sx={{ mt: 2, width: "100%" }}
                    onClick={handleGenerateOTP}
                  >
                    Resend OTP
                  </Button>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  helperText="Password must be at least 6 characters and different from old password."
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, backgroundColor: "#635DFF", color: "#fff", width: "100%" }}
                  onClick={handlePasswordChange}
                >
                  Change Password
                </Button>
              </>
            )}
          </form>
        </Container>
      </Grid>

      {/* Right Side (Illustration) */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "#0F172A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          padding: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            <span style={{ color: "#43B581" }}>Destination Vista</span>
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Manage destinations, vendors, and bookings.
          </Typography>

          <Box
            sx={{
              mt: 3,
              backgroundColor: "white",
              borderRadius: 3,
              padding: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: 3,
              maxWidth: 350,
              mx: "auto",
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image="/img/login.jpg"
              alt="Destination Vista"
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ForgotPassword;
