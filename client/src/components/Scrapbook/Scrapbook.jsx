import React, { useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import DrawerComponent from './DrawerComponent';
import DarkModeButton from '../Theme/DarkModeButton';
import { darkTheme, lightTheme } from "../Theme/theme";
import useDarkMode from "../../context/useDarkMode";
import useAuth from "../../context/useAuth";

const Scrapbook = () => {
  const { darkMode } = useDarkMode();
  const { id } = useParams();
  const [scrapbook, setScrapbook] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchScrapbook = async () => {
      const response = await fetch(`http://localhost:5001/scrapbook?email=${user}&id=${id}`);
      const data = await response.json();
      setScrapbook(data);
    };

    if (user && id) {
      fetchScrapbook();
    }
  }, [user, id]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <DrawerComponent />
      <DarkModeButton />

      <Box sx={{ padding: '20rem' }}>
        {scrapbook ? (
          <Typography variant="h4" component="h1" gutterBottom>
            {scrapbook.title}
          </Typography>
        ) : (
          <Typography variant="h4" component="h1" gutterBottom>
            Scrapbook not found.
          </Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Scrapbook;
