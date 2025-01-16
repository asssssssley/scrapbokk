import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  ThemeProvider,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import DrawerComponent from "./DrawerComponent";
import DarkModeButton from "../Theme/DarkModeButton";
import { darkTheme, lightTheme } from "../Theme/theme";
import useDarkMode from "../../context/useDarkMode";
import useAuth from "../../context/useAuth";
import ErrorPage from "../Error/ErrorPage";
import Slide from "./Slide";
import EditIcon from "@mui/icons-material/Edit";
import CreateScrapbookModal from '../Dashboard/CreateScrapbookModal';

const Scrapbook = () => {
  const { darkMode } = useDarkMode();
  const { id } = useParams();
  const [scrapbook, setScrapbook] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const iconStyle = {
    fontSize: "30px",
    color: darkMode
      ? darkTheme.palette.text.primary
      : lightTheme.palette.text.primary,
  };

  useEffect(() => {
    const fetchScrapbook = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/scrapbook?email=${user}&id=${id}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            setError("Scrapbook not found");
          } else {
            setError("An error occurred while fetching the scrapbook");
          }
          return;
        }

        const data = await response.json();
        setScrapbook(data);
      } catch (err) {
        setError("Failed to fetch scrapbook");
        console.error(err);
      }
    };

    if (user && id) {
      fetchScrapbook();
    }
  }, [user, id]);

  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => setEditModalOpen(false);

  const handleScrapbookUpdate = (updatedData) => {
    setScrapbook((prev) => ({ ...prev, ...updatedData }));
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box display="flex" justifyContent="center" alignItems="center" width="100%">
        <Typography variant="h4">
          {scrapbook ? scrapbook.title : "Loading..."}
        </Typography>
        <IconButton onClick={handleEditModalOpen}>
          <EditIcon sx={iconStyle} />
        </IconButton>
      </Box>
      <DrawerComponent />
      <DarkModeButton />
      <Slide color={scrapbook ? scrapbook.color : ""} />
      {scrapbook && (
        <CreateScrapbookModal
          open={isEditModalOpen}
          onClose={handleEditModalClose}
          scrapbook={scrapbook}
          darkTheme={darkTheme}
          lightTheme={lightTheme}
          user={user}
          mode="update"
        />
      )}
    </ThemeProvider>
  );
};

export default Scrapbook;
