import React from 'react';
import { Button } from '@mui/material';

const DeletePageButton = ({ handleDeletePage, anchor, mousePosition }) => {
  return (
    anchor && (
      <Button
        className="context-menu"
        onClick={handleDeletePage}
        sx={{
          position: 'absolute',
          top: mousePosition.y + 10,
          left: mousePosition.x + 10,
          backgroundColor: 'red',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          boxShadow: 3,
          '&:hover': {
            backgroundColor: 'darkred',
          },
        }}
      >
        Delete
      </Button>
    )
  );
};

export default DeletePageButton;
