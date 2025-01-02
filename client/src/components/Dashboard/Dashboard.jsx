import React, { useContext, useState } from "react";
import DarkModeContext from "../../context/DarkModeContext";
import AuthContext from "../../context/AuthContext";
import { ThemeProvider, createTheme, Button, CssBaseline, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CreateScrapbookModal from './CreateScrapbookModal';
import ScrapbookDisplay from './ScrapbookDisplay';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { logout } = useContext(AuthContext);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: { default: '#323232' },
      text: { primary: '#93a174' },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: { default: '#f6eed6' },
      text: { primary: '#5d6a43' },
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

  const scrapbooks = [
    { title: 'London', pages: '12', img: 'https://via.placeholder.com/150/0000FF/808080?Text=PAKAINFO.com' },
    { title: 'Sydney', pages: '10', img: 'https://i.imgur.com/CzXTtJV.jpg' },
    { title: 'Rome', pages: '7', img: 'https://i.imgur.com/OB0y6MR.jpg' },
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
        <KeyboardArrowUpIcon />
      </Button>

      <Button
        onClick={() => setOpen(true)}
        sx={{
          ...getTopButtonStyles(darkMode, darkTheme, lightTheme),
          top: "20px",
          left: "20px",
        }}
      >
        Create
      </Button>

      <CreateScrapbookModal
        open={open}
        onClose={() => setOpen(false)}
        darkMode={darkMode}
        darkTheme={darkTheme}
        lightTheme={lightTheme}
        buttonStyle={getTopButtonStyles}
      />

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
        Scrapbook
      </Typography>

      <ScrapbookDisplay scrapbooks={scrapbooks} />
    </ThemeProvider>
  );
};

export default Dashboard;
