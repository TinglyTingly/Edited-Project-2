"use client";

import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import NavBar from "./components/NavBar";
import OutOfStock from "./components/OutOfStock";
import LowStock from "./components/LowStock";
import InStock from "./components/InStock";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Box
        // width="100vw"
        display={"flex"}
        justifyContent={"space-around"}
        flexDirection={"row"}
        alignItems={"center"}
        gap={2}
        flexWrap={"wrap"}
      >
        <OutOfStock />
        <LowStock />
        <InStock />
      </Box>
    </ThemeProvider>
  );
}
