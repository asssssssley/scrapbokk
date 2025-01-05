import React, { useState } from 'react';
import { Button, styled } from '@mui/material';

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

const Uploads = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const files = [
    'location.svg', 'frame-1.svg', 'frame-2.svg', 'flower-1.svg', 'flower-2.svg',
    'flower-3.svg', 'flower-4.svg', 'bow-and-arrow.svg', 'butterfly.svg', 'suitcase.svg',
    'sugar.svg', 'magic.svg', 'gift.svg', 'longan.svg', 'trumpet.svg', 'bell.svg', 'mushroom.svg'
  ];

  const handleFileUpload = (event) => {
    const uploaded = event.target.files;
    setUploadedFiles([...uploadedFiles, ...uploaded]);
    console.log(uploaded);
  };


  return (
    <div>
      <Button
        component="label"
        variant="contained"
        sx={{
          padding: "10px",
          marginTop: "20px",
          fontSize: "1rem",
        }}
      >
        Uploads
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileUpload}
          multiple
          accept="image/*"
        />
      </Button>

      {/* Display uploaded files */}
      <div style={{ marginTop: '20px' }}>
        {uploadedFiles.length > 0 && (
          <h3>Uploaded Files:</h3>
        )}
        {uploadedFiles.length > 0 && uploadedFiles.map((file, index) => (
          <div key={index}>
            <p>{file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Uploads;
