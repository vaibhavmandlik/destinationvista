import React, { useEffect, useState } from "react";
import { 
  Container, Card, CardContent, Typography, Grid, CircularProgress 
} from "@mui/material";
import Carousel from "react-material-ui-carousel"; 

// Dummy Data (Replace this with API data)
const dummyPackage = {
  packageName: "Himalayan Adventure",
  destination: "Manali, Himachal Pradesh",
  description: "A thrilling trek to the Himalayas with breathtaking views.",
  price: "₹25,000",
  duration: "10 Days",
  availableSlots: 20,
  images: [
    "https://source.unsplash.com/800x400/?mountains,travel",
    "https://source.unsplash.com/800x400/?adventure,hiking",
    "https://source.unsplash.com/800x400/?trekking,nature",
  ],
};

const ViewDetails = () => {
  const [record, setRecord] = useState<any>(null);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setRecord(dummyPackage);
    }, 1000);
  }, []);

  if (!record) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading package details...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Card sx={{ maxWidth: 800, mx: "auto", boxShadow: 3 }}>
        
        {/* Image Carousel */}
        <Carousel animation="slide" navButtonsAlwaysVisible>
          {record.images.map((image: string, index: number) => (
            <img 
              key={index} 
              src={image} 
              alt="Package" 
              style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "5px" }}
            />
          ))}
        </Carousel>

        {/* Package Details */}
        <CardContent>
          <Typography variant="h5" fontWeight="bold">{record.packageName}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {record.destination}
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>{record.description}</Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" fontWeight="bold">Price:</Typography>
              <Typography variant="body2">{record.price}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" fontWeight="bold">Duration:</Typography>
              <Typography variant="body2">{record.duration}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" fontWeight="bold">Available Slots:</Typography>
              <Typography variant="body2">{record.availableSlots}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" fontWeight="bold">Package Name:</Typography>
              <Typography variant="body2">{record.packageName}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ViewDetails;
