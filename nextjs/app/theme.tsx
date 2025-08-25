'use client';

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#0000000d",
      paper: "#ffffff",
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: "1.75rem", // 28px
      "@media (min-width:640px)": {
        fontSize: "2rem", // 32px
      },
      "@media (min-width:1024px)": {
        fontSize: "2.5rem", // 40px
      },
      "@media (min-width:1200px)": {
        fontSize: "3rem", // 48px
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.375rem", // 22px
      "@media (min-width:640px)": {
        fontSize: "1.625rem", // 26px
      },
      "@media (min-width:1024px)": {
        fontSize: "2rem", // 32px
      },
      "@media (min-width:1200px)": {
        fontSize: "2.25rem", // 36px
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.25rem", // 20px
      "@media (min-width:640px)": {
        fontSize: "1.5rem", // 24px
      },
      "@media (min-width:1024px)": {
        fontSize: "1.75rem", // 28px
      },
      "@media (min-width:1200px)": {
        fontSize: "2rem", // 32px
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.125rem", // 18px
      "@media (min-width:640px)": {
        fontSize: "1.25rem", // 20px
      },
      "@media (min-width:1024px)": {
        fontSize: "1.5rem", // 24px
      },
      "@media (min-width:1200px)": {
        fontSize: "1.75rem", // 28px
      },
    },
    h5: {
      fontWeight: 500,
      fontSize: "1rem", // 16px
      "@media (min-width:640px)": {
        fontSize: "1.125rem", // 18px
      },
      "@media (min-width:1024px)": {
        fontSize: "1.25rem", // 20px
      },
      "@media (min-width:1200px)": {
        fontSize: "1.375rem", // 22px
      },
    },
    h6: {
      fontWeight: 500,
      fontSize: "0.9375rem", // 15px
      "@media (min-width:640px)": {
        fontSize: "1rem", // 16px
      },
      "@media (min-width:1024px)": {
        fontSize: "1.125rem", // 18px
      },
      "@media (min-width:1200px)": {
        fontSize: "1.25rem", // 20px
      },
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: "0.875rem", // 14px
      "@media (min-width:640px)": {
        fontSize: "0.9375rem", // 15px
      },
      "@media (min-width:1024px)": {
        fontSize: "1rem", // 16px
      },
      "@media (min-width:1200px)": {
        fontSize: "1.125rem", // 18px
      },
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: "0.8125rem", // 13px
      "@media (min-width:640px)": {
        fontSize: "0.875rem", // 14px
      },
      "@media (min-width:1024px)": {
        fontSize: "0.9375rem", // 15px
      },
      "@media (min-width:1200px)": {
        fontSize: "1rem", // 16px
      },
    },
    body1: {
      fontWeight: 400,
      fontSize: "0.875rem", // 14px
      "@media (min-width:640px)": {
        fontSize: "0.9375rem", // 15px
      },
      "@media (min-width:1024px)": {
        fontSize: "1rem", // 16px
      },
      "@media (min-width:1200px)": {
        fontSize: "1.0625rem", // 17px
      },
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.8125rem", // 13px
      "@media (min-width:640px)": {
        fontSize: "0.875rem", // 14px
      },
      "@media (min-width:1024px)": {
        fontSize: "0.9375rem", // 15px
      },
      "@media (min-width:1200px)": {
        fontSize: "1rem", // 16px
      },
    },
    caption: {
      fontWeight: 300,
      fontSize: "0.75rem", // 12px
      "@media (min-width:640px)": {
        fontSize: "0.78125rem", // 12.5px
      },
      "@media (min-width:1024px)": {
        fontSize: "0.8125rem", // 13px
      },
      "@media (min-width:1200px)": {
        fontSize: "0.84375rem", // 13.5px
      },
    },
    button: {
      fontWeight: 500,
      textTransform: "uppercase",
      fontSize: "0.8125rem", // 13px
      "@media (min-width:640px)": {
        fontSize: "0.875rem", // 14px
      },
      "@media (min-width:1024px)": {
        fontSize: "0.9375rem", // 15px
      },
      "@media (min-width:1200px)": {
        fontSize: "1rem", // 16px
      },
    },
    overline: {
      fontWeight: 400,
      textTransform: "uppercase",
      fontSize: "0.6875rem", // 11px
      "@media (min-width:640px)": {
        fontSize: "0.71875rem", // 11.5px
      },
      "@media (min-width:1024px)": {
        fontSize: "0.75rem", // 12px
      },
      "@media (min-width:1200px)": {
        fontSize: "0.78125rem", // 12.5px
      },
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});
