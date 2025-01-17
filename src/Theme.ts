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
  },
});

export default theme;
