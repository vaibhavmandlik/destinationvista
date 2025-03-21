import React from 'react';
import { useUpdate, useNotify, useRefresh, useRecordContext } from 'react-admin';
import { MenuItem, Select } from '@mui/material';

const StatusDropdown = (props:any) => {
 const record:any = useRecordContext();
 console.log(record);
  const [update] = useUpdate();
  const notify = useNotify();
  const refresh = useRefresh();

  const handleChange = (event) => {
    update(
      'booking',
      { id: record.id, data: {...record, status: event.target.value } },
      {
        onSuccess: () => {
          notify('Status updated successfully', { type: 'success' });
          refresh();
        },
        onError: (error) => notify(`Error: ${error.message}`, { type: 'warning' }),
      }
    );
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "0": // Pending
        return "#FFA500"; // Orange
      case "1": // Confirmed
        return "#008000"; // Green
      case "2": // Cancelled
        return "#FF0000"; // Red
      default:
        return "#000000"; // Black
    }
  }

  return (
    <Select    sx={{
        color: getStatusColor(record.status), // Text color
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: getStatusColor(record.status), // Border color
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: getStatusColor(record.status), // Border color when focused
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: getStatusColor(record.status), // Border color on hover
        },
      }} value={record.status} onChange={handleChange}>
      <MenuItem value="0">Pending</MenuItem>
      <MenuItem value="1">Confirmed</MenuItem>
      <MenuItem value="2">Cancelled</MenuItem>
    </Select>
  );
};

export default StatusDropdown;