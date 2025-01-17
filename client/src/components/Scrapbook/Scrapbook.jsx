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
import { getScrapbook } from "./ScrapbookCalls";

const Scrapbook = () => {
  const { darkMode } = useDarkMode();
  const { id } = useParams();
  const { user } = useAuth();
  const [title, setTitle] = useState("Loading...");
  const [color, setColor] = useState("");
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

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
    const fetchScrapbookData = async () => {
      try {
        const data = await getScrapbook(user, id);
        setTitle(data.title);
        setColor(data.color);
        setPages(data.pages);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    if (user && id) {
      fetchScrapbookData();
    }
  }, [user, id]);

  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => setEditModalOpen(false);

  const handleScrapbookUpdate = (updatedData) => {
    if (updatedData.title) setTitle(updatedData.title);
    if (updatedData.color) setColor(updatedData.color);
    if (updatedData.pages) setPages(updatedData.pages);
  };

  const handlePageClick = (selectedIndex) => {
    setPage(selectedIndex);
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
        <Slide page={page + 1} backgroundColor={backgroundColor} textColor={textColor} />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" width="100%">
      <Preview
        pages={pages}
        setPages={handleScrapbookUpdate}
        page={page}
        onPageClick={handlePageClick}
      />
      </Box>
      <DrawerComponent />
      <DarkModeButton />
      {title && (
        <CreateScrapbookModal
          open={isEditModalOpen}
          onClose={handleEditModalClose}
          scrapbook={{ title, color, pages }}
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
