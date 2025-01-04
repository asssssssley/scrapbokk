import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { Modal, Box, Typography, Input, InputLabel, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

const CreateScrapbookModal = ({ open, onClose, darkMode, darkTheme, lightTheme, buttonStyle }) => {
  const [background, setBackground] = useState('white');

  const handleBackground = (e, newBackground) => {
    if (newBackground !== null) {
      setBackground(newBackground);
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '3px solid',
    borderColor: 'text.primary',
    color: 'text.primary',
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
      {background === value && <DoneIcon sx={{ color: iconColor }} />}
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
    color: darkMode
      ? darkTheme.palette.background.default
      : lightTheme.palette.background.default,
    backgroundColor: darkMode
      ? darkTheme.palette.text.primary
      : lightTheme.palette.text.primary,
  });


  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h4" sx={{ marginBottom: 2 }}>
          Create Scrapbook
        </Typography>

        <InputLabel
          htmlFor="scrapbook-name"
          sx={{
            fontSize: '1.5rem',
            color: 'text.primary',
            marginBottom: 2
          }}
        >
          Name
        </InputLabel>
        <Input
          id="scrapbook-name"
          sx={{
            padding: '10px',
            fontSize: '1.5rem',
            marginBottom: 3,
            backgroundColor: 'background.default',
            color: 'text.primary',
          }}
        />

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          sx={getButtonStyles}
        >
          Add Thumbnail
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => console.log(event.target.files)}
            multiple
            accept="image/*"
          />
        </Button>

        <InputLabel
          htmlFor="scrapbook-background"
          sx={{
            fontSize: '1.5rem',
            color: 'text.primary',
            marginBottom: 2
          }}
        >
          Background
        </InputLabel>

        <ToggleButtonGroup
          value={background}
          exclusive
          onChange={handleBackground}
          sx={{ marginBottom: 3 }}
        >
          <ColorToggleButton
            value="white"
            selectedColor="#eeeeee"
            unselectedColor="#eeeeee"
            iconColor="#000"
          />
          <ColorToggleButton
            value="light-brown"
            selectedColor="#d4b38e"
            unselectedColor="#d4b38e"
            iconColor="#000"
          />
          <ColorToggleButton
            value="dark-brown"
            selectedColor="#76573d"
            unselectedColor="#76573d"
            iconColor="#fff"
          />
          <ColorToggleButton
            value="black"
            selectedColor="#060a09"
            unselectedColor="#060a09"
            iconColor="#fff"
          />
        </ToggleButtonGroup>

        <Button
          sx={{
            ...buttonStyle(darkMode, darkTheme, lightTheme),
            position: "relative",
          }}
          variant="contained"
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateScrapbookModal;
