import * as React from 'react';
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner() {
  return (
    <Box sx={{ display: 'flex', justifyContent :'center' ,  alignItems: 'center', flexWrap: 'wrap' }}>
      <CircularProgress color="success" size="5rem" />
    </Box>
  );
}
