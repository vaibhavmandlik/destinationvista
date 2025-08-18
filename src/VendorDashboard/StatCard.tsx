import React, { useCallback, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Toast, ToastContainer } from "react-bootstrap";
import {
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  Create,
  Toolbar,
  SaveButton,
  useGetList,
  useDataProvider,
} from "react-admin";

const StatCard = ({
  icon,
  label,
  value,
  change,
  color,
  bgColor,
  onOpen,
}: any) => (
  <Card sx={{ borderRadius: 4, boxShadow: 3 }} onClick={onOpen}>
    <CardContent>
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          sx={{
            backgroundColor: bgColor,
            padding: 1.5,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton sx={{ color: color }}>{icon}</IconButton>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {value}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {label}
          </Typography>
          <Typography variant="caption" color="primary">
            {change}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default function DashboardStats() {
  const { data } = useGetList("statistics", {
    filter: { vendorId: localStorage.getItem("selectedVendor") },
  });
  const { data: withdrawalsData = [] } = useGetList("withdrawals", {
    filter: { vendorId: localStorage.getItem("selectedVendor") },
  });
  const [open, setOpen] = React.useState(false);
  const [openWithdrawal, setOpenWithdrawal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const dataProvider = useDataProvider();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWithdrawOpen = () => {
    setOpenWithdrawal(true);
  };

  const handleSubmitWithdrawal = async (data: any) => {
    try {
      await dataProvider.create("vendor/withdraw", {
        data: {
          vendorId: localStorage.getItem("selectedVendor"),
          amount: data.amount,
          note: data.notes,
        },
      });
      console.log("Withdrawal created successfully");
      setToastMessage("Withdrawal request submitted successfully!");
      setShowToast(true);
      setOpenWithdrawal(false);
    } catch (error) {
      setToastMessage("Error submitting withdrawal request.");
      setShowToast(true);
      console.error("Error creating withdrawal:", error);
    }
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<AccountBalanceWalletIcon />}
            label="Wallet Balance"
            value={data?.[0]?.data?.totalWalletAmount}
            change="+5% from last week"
            color="#fff"
            bgColor="#1976d2"
            onOpen={handleOpen}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<BookOnlineIcon />}
            label="Total Booking"
            value="1,200"
            change="+12% from last week"
            color="#fff"
            bgColor="#f9a825"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<TravelExploreIcon />}
            label="Total Packages"
            value="75"
            change="-2% from last week"
            color="#fff"
            bgColor="#43a047"
          />
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Wallet Balance {data?.[0]?.data?.totalWalletAmount}
          <Button variant="contained" onClick={handleWithdrawOpen}>
            Withdraw
          </Button>
        </DialogTitle>
        <DialogContent dividers>
          {Array.isArray(withdrawalsData) && withdrawalsData.length === 0 ? (
            <Typography>No withdrawals yet</Typography>
          ) : (
            <Typography variant="subtitle1">
              All Withdrawals : {withdrawalsData}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* withdrwals wallet amount dialog box */}
      <Dialog
        open={openWithdrawal}
        onClose={() => {
          setOpenWithdrawal(false);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Request Withdrawal</DialogTitle>
        <DialogContent>
          <Create resource="withdrawals">
            <SimpleForm
              onSubmit={handleSubmitWithdrawal}
              toolbar={
                <Toolbar>
                  <SaveButton label="Submit" />
                  <Button
                    onClick={() => {
                      setOpenWithdrawal(false);
                    }}
                    style={{ marginLeft: "1rem" }}
                  >
                    Cancel
                  </Button>
                </Toolbar>
              }
              record={data}
            >
              <NumberInput
                source="amount"
                label="Amount"
                validate={[
                  required(),
                  (value) =>
                    data && value > data?.[0]?.data?.totalWalletAmount
                      ? "Cannot request more than wallet amount"
                      : undefined,
                ]}
              />
              <TextInput source="notes" label="Notes" />
            </SimpleForm>
          </Create>
        </DialogContent>
      </Dialog>
    </>
  );
}
