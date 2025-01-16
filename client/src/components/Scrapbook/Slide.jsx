import React from 'react';
import { Box } from '@mui/material';

const Slide = ({ color }) => {
  let backgroundColor;

  if (color === 'white') {
    backgroundColor = '#eeeeee';
  } else if (color === 'light-brown') {
    backgroundColor = '#d4b38e';
  } else if (color === 'dark-brown') {
    backgroundColor = '#76573d';
  } else if (color === 'black') {
    backgroundColor = '#060a09';
  } else {
    backgroundColor = '#ffffff';
  }

  return (
    <Box
      sx={{
        width: {
          xs: '200px',
          sm: '500px',
          md: '700px',
          lg: '900px',
        },
        height: {
          xs: '100px',
          sm: '300px',
          md: '500px',
          lg: '700px',
        },
        margin: 'auto',
        backgroundColor: backgroundColor,
        borderRadius: '8px',
        boxShadow: 3,
        padding: '400px',
        display: 'fixed',
        postiton: 'fixed',
        marginLeft: '500px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};

export default Slide;
