import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router";
import { Drawer, Box, ListItem, ListItemIcon, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import DarkModeContext from '../../context/DarkModeContext';
import { darkTheme, lightTheme } from '../Theme/theme';
import DrawerToggleButton from './DrawerToggleButton';

const DrawerComponent = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isElement, setIsElement] = useState(true);
  const { darkMode } = useContext(DarkModeContext);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleHomeButton = () => {
    navigate("/dashboard");
  };

  const handleShareButton = () => {
    console.log('share');
  };

  const handleUploadButton = () => {
    console.log('download');
  };

  const iconStyle = () => ({
    fontSize: '50px',
    color: darkMode
      ? darkTheme.palette.background.default
      : lightTheme.palette.background.default,
  });

  const listItemStyle = (isSelected) => ({
    backgroundColor: isSelected
      ? darkMode
        ? darkTheme.palette.text.secondary
        : lightTheme.palette.text.secondary
      : 'transparent',
  });

  return (
    <>
      {/* Persistent Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        variant="persistent"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 400,
            border: 0,
            boxSizing: 'border-box',
            backgroundColor: darkMode
              ? darkTheme.palette.text.primary
              : lightTheme.palette.text.primary,
            color: darkMode
              ? darkTheme.palette.background.default
              : lightTheme.palette.background.default,
          },
        }}
      >
        <Box sx={{ display: 'flex', padding: 1 }}>
          {/* Icons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ListItem
              button
              onClick={handleHomeButton}
              sx={listItemStyle(false)}
            >
              <ListItemIcon>
                <HomeIcon sx={iconStyle} />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              onClick={() => setIsElement(true)}
              sx={listItemStyle(isElement)}
            >
              <ListItemIcon>
                <PlaylistAddIcon sx={iconStyle} />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              onClick={() => setIsElement(false)}
              sx={listItemStyle(!isElement)}
            >
              <ListItemIcon>
                <CloudUploadIcon sx={iconStyle} />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              onClick={() => handleShareButton()}
              sx={listItemStyle(false)}
            >
              <ListItemIcon>
                <ShareIcon sx={iconStyle} />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              onClick={() => handleUploadButton()}
              sx={listItemStyle(false)}
            >
              <ListItemIcon>
                <DownloadIcon sx={iconStyle} />
              </ListItemIcon>
            </ListItem>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, padding: 2 }}>
            <Typography variant="h6" color={darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default}>
              {isElement ? 'Element' : 'Upload'}
            </Typography>
          </Box>
        </Box>
      </Drawer>

      {/* Toggle Button */}
      <DrawerToggleButton open={open} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default DrawerComponent;
