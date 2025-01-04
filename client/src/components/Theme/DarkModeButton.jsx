import React, { useContext } from "react";
import { Button } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeContext from "../../context/DarkModeContext";
import { darkTheme, lightTheme } from "./theme";

const DarkModeButton = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const getButtonStyles = () => ({
    position: "fixed",
    padding: "5px",
    transition: "background-color 0.3s",
    borderRadius: "30px",
    fontSize: { xs: "0.70rem", sm: "1rem", md: "1.3rem" },
    backgroundColor: darkMode
      ? lightTheme.palette.background.default
      : darkTheme.palette.background.default,
    color: darkMode
      ? lightTheme.palette.text.primary
      : darkTheme.palette.text.primary,
  });

  return (
    <Button
      onClick={toggleDarkMode}
      sx={{
        ...getButtonStyles(),
        bottom: "20px",
        right: "20px",
      }}
    >
      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </Button>
  );
};

export default DarkModeButton;
