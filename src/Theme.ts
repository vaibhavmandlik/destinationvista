import { createTheme } from "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    bootstrap: true;
  }
  interface ButtonPropsColorOverrides {
    primary: true;
    secondary: true;
    success: true;
    danger: true;
    warning: true;
    info: true;
    light: true;
    dark: true;
    link: true;
  }
}

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // margin: '10px 0', // Add spacing between input fields
          
          '& .MuiOutlinedInput-root': {
            transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
            '& fieldset': {
              borderColor: '#ccc', // Light border color
            },
            '&:hover fieldset': {
              borderColor: '#000', // Darker border on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7AB730 ', // Green border when focused
            },
          },
          '& .MuiInputLabel-root': {
            color: '#666', // Label color
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#4caf50', // Label color when focused
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#007bff",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "bootstrap", color: "primary" },
          style: {
            textTransform: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          },
        },
        {
          props: { variant: "bootstrap", color: "secondary" },
          style: {
            textTransform: "none",
            backgroundColor: "#6c757d",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#5a6268",
            },
          },
        },
        {
          props: { variant: "bootstrap", color: "success" },
          style: {
            textTransform: "none",
            backgroundColor: "#28a745",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#218838",
            },
          },
        },
        {
          props: { variant: "bootstrap", color: "danger" },
          style: {
            textTransform: "none",
            backgroundColor: "#dc3545",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#c82333",
            },
          },
        },
        {
          props: { variant: "bootstrap", color: "warning" },
          style: {
            textTransform: "none",
            backgroundColor: "#ffc107",
            color: "#212529",
            "&:hover": {
              backgroundColor: "#e0a800",
            },
          },
        },
        {
          props: { variant: "bootstrap", color: "info" },
          style: {
            textTransform: "none",
            backgroundColor: "#17a2b8",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#138496",
            },
          },
        },
        {
          props: { variant: "bootstrap", color: "light" },
          style: {
            textTransform: "none",
            backgroundColor: "#f8f9fa",
            color: "#212529",
            "&:hover": {
              backgroundColor: "#e2e6ea",
            },
          },
        },
        {
          props: { variant: "bootstrap", color: "dark" },
          style: {
            textTransform: "none",
            backgroundColor: "#343a40",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#23272b",
            },
          },
        },
        {
          props: { variant: "bootstrap", color: "link" },
          style: {
            textTransform: "none",
            backgroundColor: "transparent",
            color: "#007bff",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          },
        },
      ],
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f4f8",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          fontSize: "1rem",
          color: "#222",
        },
        root: {
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 16,
          paddingRight: 16,
          fontSize: "0.97rem",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background 0.2s",
          "&:hover": {
            backgroundColor: "#f5f7fa",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // Stronger specificity for Datagrid header cells
        ".RaDatagrid-headerCell, .RaDatagrid-headerCell.MuiTableCell-head": {
          backgroundColor: "#007bff !important", // Changed to #007bff
          color: "#fff !important",
          fontWeight: 700,
          fontSize: "1rem",
        },
        // Ensure sorted header text stays white
        ".RaDatagrid-headerCell .MuiTableSortLabel-root.Mui-active, .RaDatagrid-headerCell .MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon": {
          color: "#fff !important",
          fill: "#fff !important",
        },
        // Datagrid body cells
        ".RaDatagrid-cell": {
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 16,
          paddingRight: 16,
          fontSize: "0.97rem",
        },
        // Datagrid rows
        ".RaDatagrid-row": {
          transition: "background 0.2s",
        },
        ".RaDatagrid-row:hover": {
          backgroundColor: "#f5f7fa",
        },
        // Alternate row color (zebra striping)
        ".RaDatagrid-row:nth-of-type(even)": {
          backgroundColor: "#f9fafb",
        },
        ".RaDatagrid-row:nth-of-type(odd)": {
          backgroundColor: "#fff",
        },
        // Optional: round the corners of the datagrid container
        ".RaDatagrid-root": {
          borderRadius: 12,
          overflow: "hidden",
        },
      },
    },
  },
});

export default theme;
