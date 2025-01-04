import React from 'react';
import { IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { darkTheme, lightTheme } from '../Theme/theme';
import DarkModeContext from '../../context/DarkModeContext';

const DrawerToggleButton = ({ open, toggleDrawer }) => {
  const { darkMode } = React.useContext(DarkModeContext);

  const iconStyle = {
    fontSize: '50px',
    color: darkMode
      ? darkTheme.palette.background.default
      : lightTheme.palette.background.default,
  };

  return (
    <IconButton
      onClick={toggleDrawer}
      sx={{
        background: darkMode
          ? darkTheme.palette.text.primary
          : lightTheme.palette.text.primary,
        position: 'fixed',
        height: '100%',
        top: '50%',
        left: open ? 350 : 0,
        transition: 'left 0.3s ease',
        zIndex: 1201,
        transform: 'translateY(-50%)',
        borderRadius: 0,
        "&:hover": {
          backgroundColor: darkMode
            ? lightTheme.palette.text.primary
            : darkTheme.palette.text.primary,
        },
      }}
    >
      {open ? (
        <ArrowBackIcon sx={iconStyle} />
      ) : (
        <ArrowForwardIcon sx={iconStyle} />
      )}
    </IconButton>
  );
};

export default DrawerToggleButton;
