import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Modal, Box, Typography, Input, InputLabel, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import imageCompression from 'browser-image-compression';
import { createScrapbook, updateScrapbook } from "./DashboardCalls";
import { useParams } from "react-router-dom";

const ScrapbookModal = ({
  open,
  onClose,
  darkMode,
  darkTheme,
  lightTheme,
  user,
  mode = "create",
  scrapbook = {},
  onScrapbookUpdate,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [color, setColor] = useState("white");

  useEffect(() => {
    if (mode === "update" && scrapbook) {
      setTitle(scrapbook.title || "");
      setImg(scrapbook.img || "");
      setColor(scrapbook.color || "white");
    }
  }, [mode, scrapbook]);

  const handleImg = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          setImg(reader.result);
        };
      } catch (error) {
        console.error('Error compressing file:', error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (mode === "create") {
        const responseData = await createScrapbook(user, title, img, color);
        navigate(`/scrapbook/${responseData.id}`);
      } else {
        const responseData = await updateScrapbook(user, id, title, img, color);
        navigate(`/scrapbook/${responseData.id}`);
      }
      onScrapbookUpdate({ title, color });
      onClose();
    } catch (error) {
      console.error(`Error ${mode === "create" ? "creating" : "updating"} scrapbook:`, error);
    }
  };

  const handleColor = (e, newColor) => {
    if (newColor !== null) setColor(newColor);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '3px solid',
    borderColor: '.text.primary',
    color: '.text.primary',
    boxShadow: 100,
    padding: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const ColorToggleButton = ({ value, selectedColor, unselectedColor, iconColor }) => (
    <ToggleButton
      value={value}
      sx={{
        background: unselectedColor,
        padding: 3,
        '&.Mui-selected': {
          backgroundColor: selectedColor,
        },
      }}
    >
      {color === value && <DoneIcon sx={{ color: iconColor }} />}
    </ToggleButton>
  );

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const getButtonStyles = () => ({
    padding: "15px",
    marginBottom: 2,
    transition: "background-color 0.3s",
    borderRadius: "15px",
    fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" },
    color: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default,
    backgroundColor: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary,
  });

  const handleModalClose = () => {
    setTitle(scrapbook.title || "");
    setImg(scrapbook.img || "");
    setColor(scrapbook.color || "white");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h4" sx={{ marginBottom: 2 }}>
          {mode === "create" ? "Create Scrapbook" : "Update Scrapbook"}
        </Typography>

        <InputLabel
          htmlFor="scrapbook-title"
          sx={{ fontSize: '1.5rem', color: '.text.primary', marginBottom: 2 }}
        >
          Title
        </InputLabel>
        <Input
          id="scrapbook-title"
          sx={{
            padding: '10px',
            fontSize: '1.5rem',
            marginBottom: 3,
            backgroundColor: 'background.default',
            color: '.text.primary',
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Button
          component="label"
          variant="contained"
          tabIndex={-1}
          sx={getButtonStyles()}
        >
          {img ? "Change Thumbnail" : "Add Thumbnail"}
          <VisuallyHiddenInput
            type="file"
            onChange={handleImg}
            accept="image/*"
          />
        </Button>

        <InputLabel
          htmlFor="scrapbook-color"
          sx={{ fontSize: '1.5rem', color: '.text.primary', marginBottom: 2 }}
        >
          Color
        </InputLabel>

        <ToggleButtonGroup
          value={color}
          exclusive
          onChange={handleColor}
          sx={{ marginBottom: 3 }}
        >
          <ColorToggleButton value="white" selectedColor="#eeeeee" unselectedColor="#eeeeee" iconColor="#000" />
          <ColorToggleButton value="light-brown" selectedColor="#d4b38e" unselectedColor="#d4b38e" iconColor="#000" />
          <ColorToggleButton value="dark-brown" selectedColor="#76573d" unselectedColor="#76573d" iconColor="#fff" />
          <ColorToggleButton value="black" selectedColor="#060a09" unselectedColor="#060a09" iconColor="#fff" />
        </ToggleButtonGroup>

        <Button
          sx={{
            ...getButtonStyles(),
            position: "relative",
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          {mode === "create" ? "Create" : "Update"}
        </Button>
      </Box>
    </Modal>
  );
};

export default ScrapbookModal;
