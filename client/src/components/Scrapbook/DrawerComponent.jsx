import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { Drawer, Box, ListItem, ListItemIcon, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import useDarkMode from "../../context/useDarkMode";
import { darkTheme, lightTheme } from '../Theme/theme';
import DrawerToggleButton from './DrawerToggleButton';
import Elements from './Elements';
import Uploads from './Uploads';

const DrawerComponent = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isElement, setIsElement] = useState(true);
  const { darkMode } = useDarkMode();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleHomeButton = () => {
    navigate("/dashboard");
  };

  const handleShareButton = () => {
    console.log('share!');
  };

  const handleUploadButton = () => {
    console.log('download!');
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
            width: 350,
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
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
          {/* Fixed List */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            width: 80,
            position: 'fixed',
            top: 0,
            left: 0,
            paddingTop: 2
          }}>
            <ListItem
              button='true'
              onClick={handleHomeButton}
              sx={listItemStyle(false)}
            >
              <ListItemIcon>
                <HomeIcon sx={iconStyle} />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button='true'
              onClick={() => setIsElement(true)}
              sx={listItemStyle(isElement)}
            >
              <ListItemIcon>
                <PlaylistAddIcon sx={iconStyle} />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button='true'
              onClick={() => setIsElement(false)}
              sx={listItemStyle(!isElement)}
            >
              <ListItemIcon>
                <CloudUploadIcon sx={iconStyle} />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button='true'
              onClick={() => handleShareButton()}
              sx={listItemStyle(false)}
            >
              <ListItemIcon>
                <ShareIcon sx={iconStyle} />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button='true'
              onClick={() => handleUploadButton()}
              sx={listItemStyle(false)}
            >
              <ListItemIcon>
                <DownloadIcon sx={iconStyle} />
              </ListItemIcon>
            </ListItem>
          </Box>

          {/* Scrollable Content */}
          <Box sx={{
            flex: 1,
            padding: 2,
            marginLeft: '70px',
            overflowY: 'auto',
            height: '100%'
          }}>
            <Typography variant="h6" color={darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default}>
              {isElement ? <Elements /> : <Uploads />}
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
