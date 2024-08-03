import { createTheme } from "@mui/material";

export const colors = [
  "#F49D6E",
  "#E85A4F",
  "#FFD166",
  "#8ABEB7",
  "#247BA0",
  "#D3D3D3",
];

const theme = createTheme({
  palette: {
    common: {
      black: "#000",
      white: "#FFF",
    },
    primary: {
      main: "#00b9fc",
      light: "#cccccc",
      dark: "#42a5f5",
      contrastText: "rgba(0,0,0,0,87)",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    background: {
      default: "#1a000d", // deep red
    },
    text: {
      primary: "#FFF",
      secondary: "#FFF",
    },
  },
  components: {
    MuiInputInput: {
      border: "1px solid white",
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        message: {
          fontWeight: 600,
          textTransform: "capitalize",
        },
      },
    },
  },
  typography: {
    fontFamily: "Poetsen One, sans-serif",
    color: "#1a000d",
    button: {
      textTransform: "unset",
    },
    h2: {
      fontSize: 30,
      padding: 10,
    },
    h3: {
      fontFamily: "Bigshot One, serif",
      fontSize: 20,
      padding: 10,
    },
    h5: {
      fontFamily: "Bigshot One, serif",
    },
    h6: {
      fontFamily: "Bigshot One, serif",
    },
  },
  shape: {
    borderRadius: 0,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 1190,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
