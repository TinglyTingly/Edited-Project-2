"use client";

import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import NavBar from "./components/NavBar";
import OutOfStock from "./components/OutOfStock";
import LowStock from "./components/LowStock";
import InStock from "./components/InStock";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar onSearchChange={setSearchTerm} />
      <Box
        // width="100vw"
        display={"flex"}
        justifyContent={"space-around"}
        flexDirection={"row"}
        alignItems={"flex-start"}
        gap={2}
        flexWrap={"wrap"}
      >
        <OutOfStock searchTerm={searchTerm} />
        <LowStock />
        <InStock />
      </Box>
    </ThemeProvider>
  );
}
