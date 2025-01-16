import React from 'react';
import { Box, Typography } from '@mui/material';

const Slide = ({ backgroundColor, textColor, page }) => {
  return (
    <Box
      sx={{
        width: {
          xs: '600px',
          sm: '800px',
          md: '1000px',
          lg: '1200px',
        },
        height: {
          xs: '200px',
          sm: '400px',
          md: '600px',
          lg: '800px',
        },
        backgroundColor: backgroundColor,
        borderRadius: '10px',
        boxShadow: 3,
        margin: '15px',
        position: 'relative',
      }}
    >
      <Typography
        sx={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          color: textColor,
          fontSize: '16px',
        }}
      >
        {page}
      </Typography>
    </Box>
  );
};

export default Slide;
