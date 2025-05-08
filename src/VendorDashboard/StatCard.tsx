import React from "react";
import { Card, CardContent, Typography, Box, Grid, IconButton } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useGetList } from "react-admin";

const StatCard = ({ icon, label, value, change, color, bgColor }:any) => (
  <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
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
    const { data } = useGetList("statistics",{filter:{vendorId:localStorage.getItem("selectedVendor")}});


  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <StatCard
          icon={<AccountBalanceWalletIcon />}
          label="Wallet Balance"
          value={data?.[0]?.data?.totalWalletAmount}
          change="+5% from last week"
          color="#fff"
          bgColor="#1976d2"
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
  );
}