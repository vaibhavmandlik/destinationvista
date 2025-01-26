import React from 'react';
import { styled } from '@mui/material';
import { PasswordInput } from 'react-admin';

// Create a styled version of the TextField component
const CustomThemePasswordInput = styled(PasswordInput)(({ theme }) => ({
  margin: '10px 0',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc', // Light border color
    },
    '&:hover fieldset': {
      borderColor: '#000', // Darker border on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4caf50', // Green border when focused
    },
  },
  '& .MuiInputLabel-root': {
    color: '#666', // Label color
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#4caf50', // Label color when focused
  },
}));

export default CustomThemePasswordInput;
