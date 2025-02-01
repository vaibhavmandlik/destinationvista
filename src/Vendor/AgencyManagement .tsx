import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AgencyManagement = () => {
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Icon */}
        <AddCircleOutlineIcon sx={{ fontSize: 80, color: '#4CAF50', marginBottom: 2 }} />
        
        {/* Message */}
        <Typography variant="h6" sx={{ color: '#333', textAlign: 'center', marginBottom: 3 }}>
          You haven't added an agency yet. Please add one by clicking on the "Add Agency" button in the left menu.
        </Typography>
      </Box>
    </Container>
  );
}

export default AgencyManagement;
