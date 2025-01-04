import React, { useContext } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import DrawerComponent from './DrawerComponent';
import DarkModeButton from '../Theme/DarkModeButton';
import { darkTheme, lightTheme } from "../Theme/theme";
import DarkModeContext from '../../context/DarkModeContext';

const Scrapbook = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <DrawerComponent />
        <DarkModeButton />
      </ThemeProvider>
    </>
  );
};

export default Scrapbook;
