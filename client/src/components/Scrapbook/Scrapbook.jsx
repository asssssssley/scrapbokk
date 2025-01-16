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
import CreateScrapbookModal from "../Dashboard/CreateScrapbookModal";
import Preview from "./Preview";

const Scrapbook = () => {
  const { darkMode } = useDarkMode();
  const { id } = useParams();
  const { user } = useAuth();
  const [scrapbook, setScrapbook] = useState({
    title: "Loading...",
    color: "",
    pages: [],
  });
  const [page, setPage] = useState("1");
  const [error, setError] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const { title, color, pages } = scrapbook;

  const getColors = () => {
    switch (color) {
      case "white":
        return { backgroundColor: "#eeeeee", textColor: "black" };
      case "light-brown":
        return { backgroundColor: "#d4b38e", textColor: "black" };
      case "dark-brown":
        return { backgroundColor: "#76573d", textColor: "white" };
      case "black":
        return { backgroundColor: "#060a09", textColor: "white" };
      default:
        return { backgroundColor: "#ffffff", textColor: "black" };
    }
  };

  const { backgroundColor, textColor } = getColors();

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

  const handlePageClick = (selectedPage) => {
    setPage(selectedPage);
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box display="flex" justifyContent="center" alignItems="center" width="100%" margin="15px">
        <Typography variant="h4">{title}</Typography>
        <IconButton onClick={handleEditModalOpen}>
          <EditIcon sx={iconStyle} />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" width="100%">
        <Slide page={page} backgroundColor={backgroundColor} textColor={textColor} />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" width="100%">
      <Preview
        scrapbook={{ pages, backgroundColor, textColor }}
        page={page}
        onPageClick={handlePageClick}
        setScrapbook={setScrapbook}
      />
      </Box>
      <DrawerComponent />
      <DarkModeButton />
      {scrapbook && (
        <CreateScrapbookModal
          open={isEditModalOpen}
          onClose={handleEditModalClose}
          scrapbook={scrapbook}
          darkTheme={darkTheme}
          lightTheme={lightTheme}
          user={user}
          mode="update"
          onScrapbookUpdate={handleScrapbookUpdate}
        />
      )}
    </ThemeProvider>
  );
};

export default Scrapbook;
