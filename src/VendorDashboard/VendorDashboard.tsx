import React, { useEffect } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { Button, useGetIdentity, useGetList } from 'react-admin';
import { JSONTree } from 'react-json-tree';
import DashboardStats from './StatCard';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Chip,
} from "@mui/material";
const packageData = [
  { id: 1, name: "Maldives Premium Tour", popularity: 80, bookings: "45%" },
  { id: 2, name: "Swiss Alps Adventure", popularity: 60, bookings: "29%" },
  { id: 3, name: "Thailand Budget Package", popularity: 30, bookings: "18%" },
  { id: 4, name: "Dubai Shopping Fiesta", popularity: 50, bookings: "25%" },
];

const onlineSales = [12000, 15000, 8000, 16000, 14000, 17000, 20000];
const offlineSales = [10000, 13000, 22000, 7000, 13000, 15000, 12000];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const VendorDashboard = () => {
  const { data: user } = useGetIdentity();
  const { data: VendorList,isLoading } = useGetList("vendor", {
    filter: { userId: user?.id },
  });

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

  if(isLoading) {
    return <div>Loading...</div>;
  }
  return (
    // <Box sx={{ flexGrow: 1, p: 3 }}>
    //   <Typography variant="h4" gutterBottom>
    //     Vendor Dashboard
    //   </Typography>
    // <DashboardStats/>
    // </Box>
    <Box sx={{ p: 4 }}>
      <DashboardStats/>
      <br/>
      <br/>
    <Grid container spacing={3}>
      {/* Stats */}
      {/* Top Packages Table */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ borderRadius: 4, p: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Top Packages
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Package</TableCell>
                  <TableCell>Popularity</TableCell>
                  <TableCell>Bookings</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packageData.map((pkg, index) => (
                  <TableRow key={pkg.id}>
                    <TableCell>{String(index + 1).padStart(2, "0")}</TableCell>
                    <TableCell>{pkg.name}</TableCell>
                    <TableCell>
                      <Box sx={{ width: 100 }}>
                        <LinearProgress
                          variant="determinate"
                          value={pkg.popularity}
                          sx={{
                            height: 8,
                            borderRadius: 5,
                            backgroundColor: "#f0f0f0",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor:
                                index === 0
                                  ? "#2196f3"
                                  : index === 1
                                  ? "#4caf50"
                                  : index === 2
                                  ? "#9c27b0"
                                  : "#ff9800",
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={pkg.bookings}
                        sx={{
                          backgroundColor:
                            index === 0
                              ? "#e3f2fd"
                              : index === 1
                              ? "#e8f5e9"
                              : index === 2
                              ? "#f3e5f5"
                              : "#fff3e0",
                          color:
                            index === 0
                              ? "#2196f3"
                              : index === 1
                              ? "#4caf50"
                              : index === 2
                              ? "#9c27b0"
                              : "#fb8c00",
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {/* Ticket Sales Graph */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ borderRadius: 4, p: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Ticket Sales (Day-wise)
          </Typography>
          <LineChart
            width={500}
            height={300}
            series={[
              { data: onlineSales, label: "Online Sales", color: "#2196f3" },
            ]}
            xAxis={[{ scaleType: "point", data: days }]}
          />
        </Paper>
      </Grid>
    </Grid>
  </Box>
  );
};

export default VendorDashboard;