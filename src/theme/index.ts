"use client";

import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#456ff8",
    },
    secondary: {
      main: "#4599f8",
    },
  },
  breakpoints: {
    values: {
      xs: 50,
      sm: 375,
      md: 768,
      lg: 1024,
      xl: 1920,
    },
  },
});

export default theme;
