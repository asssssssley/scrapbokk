import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

const AddPageButton = ({ handleAddPage }) => {
  return (
    <IconButton onClick={handleAddPage} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AddIcon />
    </IconButton>
  );
};

export default AddPageButton;
