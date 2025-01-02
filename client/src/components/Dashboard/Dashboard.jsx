import React, { useContext, useState } from "react";
import DarkModeContext from "../../context/DarkModeContext";
import AuthContext from "../../context/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Card, CardContent, CardMedia, CssBaseline } from '@mui/material';
import { Typography, Button } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import thumbnailImg from "../../assets/thumbnail-placeholder.jpg";

const Dashboard = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { logout } = useContext(AuthContext);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#323232',
      },
      text: {
        primary: '#93a174',
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#f6eed6',
      },
      text: {
        primary: '#5d6a43',
      },
    },
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getButtonStyles = (darkMode, darkTheme, lightTheme) => ({
    position: "fixed",
    padding: "5px",
    transition: "background-color 0.3s",
    borderRadius: "30px",
    fontSize: { xs: "0.70rem", sm: "1rem", md: "1.3rem" },
    backgroundColor: darkMode ? lightTheme.palette.background.default : darkTheme.palette.background.default,
    color: darkMode ? lightTheme.palette.text.primary : darkTheme.palette.text.primary,
  });

  const getTopButtonStyles = (darkMode, darkTheme, lightTheme) => ({
    position: "absolute",
    transition: "background-color 0.3s",
    borderRadius: "30px",
    fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" },
    padding: { xs: "0.7rem", sm: "1rem", md: "1.2rem" },
    backgroundColor: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary,
    color: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default,
    "&:hover": {
      backgroundColor: darkMode ? lightTheme.palette.text.primary : darkTheme.palette.text.primary,
    },
  });

  // Scrapbook data
  let scrapbooks = [
    { title: 'London', pages: '12', img: 'https://via.placeholder.com/150/0000FF/808080 ?Text=PAKAINFO.com' },
    { title: 'Sydney New York is the best of the best of the best of the best of allNew York is the best of the best of the best of the best of allNew York is the best of the best of the best of the best of all', pages: '10', img: 'https://i.imgur.com/CzXTtJV.jpg' },
    { title: 'Rome', pages: '7', img: 'https://i.imgur.com/OB0y6MR.jpg' },
    { title: 'Berlin', pages: '6', img: 'https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg' },
    { title: 'Dubai', pages: '3', img: 'https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg' },
    { title: 'Barcelona', pages: '9', img: 'https://via.placeholder.com/150/000000/FFFFFF/?text=y2meta.com' },
    { title: 'Berlin', pages: '6', img: 'https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg' },
    { title: 'Dubai', pages: '3', img: 'https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg' },
    { title: 'Barcelona', pages: '9', img: 'https://via.placeholder.com/150/000000/FFFFFF/?text=y2meta.com' },
    { title: 'Berlin', pages: '6', img: 'https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg' },
    { title: 'Dubai', pages: '3', img: 'https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg' },
    { title: 'Barcelona', pages: '9', img: 'https://via.placeholder.com/150/000000/FFFFFF/?text=y2meta.com' },
    { title: 'Berlin', pages: '6', img: 'https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg' },
    { title: 'Dubai', pages: '3', img: 'https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg' },
    { title: 'Barcelona', pages: '9', img: 'https://via.placeholder.com/150/000000/FFFFFF/?text=y2meta.com' },
    { title: 'Berlin', pages: '6', img: 'https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg' },
    { title: 'Dubai', pages: '3', img: 'https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg' },
    { title: 'Barcelona', pages: '9', img: 'https://via.placeholder.com/150/000000/FFFFFF/?text=y2meta.com' },
    { title: 'Berlin', pages: '6', img: 'https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg' },
    { title: 'Dubai', pages: '3', img: 'https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg' },
    { title: 'Barcelona', pages: '9', img: 'https://via.placeholder.com/150/000000/FFFFFF/?text=y2meta.com' },
    { title: 'New York is the best of the best of the best of the best of all time', pages: '900', img: '' },
  ];

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Button
        onClick={toggleDarkMode}
        sx={{
          ...getButtonStyles(darkMode, darkTheme, lightTheme),
          bottom: "20px",
          right: "20px",
        }}
      >
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </Button>
      <Button
        onClick={scrollToTop}
        sx={{
          ...getButtonStyles(darkMode, darkTheme, lightTheme),
          bottom: "20px",
          left: "20px",
        }}
      >
        {<KeyboardArrowUpIcon />}
      </Button>
      <Button
        sx={{
          ...getTopButtonStyles(darkMode, darkTheme, lightTheme),
          top: "20px",
          left: "20px",
        }}
      >
        Create
      </Button>
      <Button
        onClick={logout}
        sx={{
          ...getTopButtonStyles(darkMode, darkTheme, lightTheme),
          top: "20px",
          right: "20px",
        }}
      >
        Logout
      </Button>
      <Typography
        variant="h2"
        sx={{
          color: "text.primary",
          fontWeight: "bold",
          fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Scrapbokk
      </Typography>
      <Box
        sx={{
          display: 'grid',
          width: '100%',
          margin: 'auto',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: { xs: '1em', sm: '2em', md: '4em' },
          paddingY: { xs: '5rem', sm: '7rem', md: '9rem' },
        }}
      >
        {scrapbooks.map((scrapbook, index) => (
          <Card
            key={index}
            sx={{
              width: { xs: 200, sm: 250, md: 300 },
              height: { xs: 200, sm: 250, md: 300 },
              padding: 2,
              borderRadius: 5,
              boxShadow: 3,
            }}
          >
            <CardMedia
              component="img"
              sx={{
                borderRadius: 5,
                height: { xs: 100, sm: 150, md: 200 },
              }}
              image={scrapbook.img || thumbnailImg}
              alt="scrapbook-thumbnail"
            />
            <CardContent sx={{ padding: 1 }}>
              <Typography variant="h6" component="div">
                {scrapbook.title.length > 18
                  ? `${scrapbook.title.slice(0, 18)}...`
                  : scrapbook.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {scrapbook.pages} pages
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
