import React from "react";
import { Box, Typography, ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from "../Theme/theme";
import useDarkMode from "../../context/useDarkMode";

const ErrorPage = () => {
  const { darkMode } = useDarkMode();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
          textAlign: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          404 Not Found
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default ErrorPage;
