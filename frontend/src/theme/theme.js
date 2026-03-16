import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#363738", // Dark Gray
      light: "#FAFAFA",
    },
    secondary: {
      main: "#DB4444", // Red
      light: "#E07575",
    },
    success: {
      main: "#47B486", // Green Button
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
    text: {
      primary: "#363738",
      // secondary: "#D37643",
    },
  },

  typography: {
    fontFamily: "'Poppins', sans-serif", // Default font

    h1: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
    },

    body1: {
      fontFamily: "'Inter', sans-serif",
    },

    button: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      textTransform: "none",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 20px",
        },

        containedPrimary: {
          backgroundColor: "#DB4444",
          "&:hover": {
            backgroundColor: "#E2B93B",
          },
        },

        containedSecondary: {
          backgroundColor: "#47B486",
          "&:hover": {
            backgroundColor: "#EB5757",
          },
        },
      },
    },
  },
});

export default theme;
