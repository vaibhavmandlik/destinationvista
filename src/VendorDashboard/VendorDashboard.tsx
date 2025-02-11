import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const VendorDashboard = () => {
  // Dummy data for demonstration
  const totalPackagesCreated = 150;
  const totalBookingsReceived = 120;
  const moneyCollected = 50000;
  const moneyWithdrawn = 20000;

  // Dummy data for the graph
  const bookingTrendsData = [
    { month: 'Jan', bookings: 10 },
    { month: 'Feb', bookings: 20 },
    { month: 'Mar', bookings: 30 },
    { month: 'Apr', bookings: 40 },
    { month: 'May', bookings: 50 },
    { month: 'Jun', bookings: 60 },
    { month: 'Jul', bookings: 70 },
    { month: 'Aug', bookings: 80 },
    { month: 'Sep', bookings: 90 },
    { month: 'Oct', bookings: 100 },
    { month: 'Nov', bookings: 110 },
    { month: 'Dec', bookings: 120 },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Vendor Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Packages Created */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Packages Created</Typography>
            <Typography variant="h4">{totalPackagesCreated}</Typography>
          </Paper>
        </Grid>

        {/* Total Bookings Received */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Bookings Received</Typography>
            <Typography variant="h4">{totalBookingsReceived}</Typography>
          </Paper>
        </Grid>

        {/* Money Collected */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Money Collected</Typography>
            <Typography variant="h4">${moneyCollected}</Typography>
          </Paper>
        </Grid>

        {/* Money Withdrawn */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Money Withdrawn</Typography>
            <Typography variant="h4">${moneyWithdrawn}</Typography>
          </Paper>
        </Grid>

        {/* Graph to Show Trends in Book Count */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Booking Trends
            </Typography>
            <LineChart
              xAxis={[{ data: bookingTrendsData.map((item) => item.month), scaleType: 'band' }]}
              series={[{ data: bookingTrendsData.map((item) => item.bookings) }]}
              height={300}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VendorDashboard;