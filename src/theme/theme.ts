import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1565c0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffb300",
    },
    success: {
      main: "#2e7d32",
    },
    warning: {
      main: "#f57c00",
    },
    error: {
      main: "#d32f2f",
    },
    background: {
      default: "#eef4ff",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"].join(", "),
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

export default theme;
