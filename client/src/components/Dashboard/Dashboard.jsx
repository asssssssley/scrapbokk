import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { ThemeProvider, CssBaseline, Typography, Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CreateScrapbookModal from "./CreateScrapbookModal";
import ScrapbookDisplay from "./ScrapbookDisplay";
import DarkModeButton from "../Theme/DarkModeButton";
import { darkTheme, lightTheme } from "../Theme/theme";
import DarkModeContext from "../../context/DarkModeContext";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [scrapbooks, setScrapbooks] = useState([]);
  const { darkMode } = useContext(DarkModeContext);
  const { logout } = useContext(AuthContext);

  const fetchScrapbooks = async () => {
    try {
      const res = await fetch(`http://localhost:5001/scrapbooks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      const data = await res.json();
      setScrapbooks(data);
    } catch (error) {
      console.error("Error fetching scrapbooks:", error);
    }
  };

  useEffect(() => {
    fetchScrapbooks();
  }, []);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getTopButtonStyles = (darkMode, darkTheme, lightTheme) => ({
    position: "absolute",
    transition: "background-color 0.3s",
    borderRadius: "30px",
    fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" },
    padding: { xs: "0.7rem", sm: "1rem", md: "1.2rem" },
    backgroundColor: darkMode
      ? darkTheme.palette.text.primary
      : lightTheme.palette.text.primary,
    color: darkMode
      ? darkTheme.palette.background.default
      : lightTheme.palette.background.default,
    "&:hover": {
      backgroundColor: darkMode
        ? lightTheme.palette.text.primary
        : darkTheme.palette.text.primary,
    },
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      <DarkModeButton />

      <Button
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          padding: "5px",
          borderRadius: "30px",
          transition: "background-color 0.3s",
          backgroundColor: darkMode
            ? lightTheme.palette.background.default
            : darkTheme.palette.background.default,
          color: darkMode
            ? lightTheme.palette.text.primary
            : darkTheme.palette.text.primary,
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
