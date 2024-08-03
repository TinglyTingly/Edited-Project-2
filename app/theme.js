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
      main: "#90caf9",
      light: "#e3f2fd",
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
      default: "#121212",
    },
    text: {
      primary: "#FFF",
      secondary: "#FFF",
    },
  },
  components: {
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
    fontFamily: "Lato, sans-serif",
    button: {
      textTransform: "unset",
      fontWeight: 700,
    },
    h2: {
      fontSize: 30,
      padding: 10,
    },
    h3: {
      fontSize: 20,
      padding: 10,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme;
