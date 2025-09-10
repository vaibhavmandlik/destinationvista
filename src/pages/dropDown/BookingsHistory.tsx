import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  CircularProgress,
  Container,
  Alert,
  Pagination,
  Stack,
} from "@mui/material";

const url = `${import.meta.env.VITE_API_URL}/booking`;

type Package = {
    id: number,
            title: string,
            price: string,
            destination: number
}

interface Booking {
  id: number;
  packageId: number;
  totalPrice: number;
  totalSlots: number;
  bookingDate: string;
  status: "0" | "1" | "2"; // 0 = Pending, 1 = Confirmed, 2 = Cancelled
  package:Package;
}

const BookingsHistory: React.FC = () => {
  const [data, setData] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; // Number of bookings per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Unauthorized: No token found. Please log in.");
        }

        const response = await axios.get<Booking[]>(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 204 || !response.data.length) {
          setError("No bookings found.");
        } else {
          setData(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setError("Unauthorized: Please log in again.");
          } else {
            setError("Failed to fetch bookings. Please try again.");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusChip = (status: string) => {
    switch (status) {
      case "1":
        return <Chip label="Confirmed" color="success" variant="outlined" />;
      case "2":
        return <Chip label="Cancelled" color="error" variant="outlined" />;
      default:
        return <Chip label="Pending" color="warning" variant="outlined" />;
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Bookings
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : data.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {paginatedData.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
                    transition: "0.3s",
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Package : {item.package.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dayjs(item.bookingDate).format("DD MMM YYYY")}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" mb={2}>
                      {getStatusChip(item.status)}
                    </Box>

                    <Typography variant="body2" gutterBottom>
                      <strong>Total Price:</strong> ₹{item.totalPrice}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Total Slots:</strong> {item.totalSlots} Seats
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Stack spacing={2} alignItems="center" mt={4}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
                color="primary"
                shape="rounded"
                size="large"
              />
            </Stack>
          )}
        </>
      ) : (
        <Alert severity="info" sx={{ mt: 2 }}>
          No bookings found.
        </Alert>
      )}
    </Container>
  );
};

export default BookingsHistory;
