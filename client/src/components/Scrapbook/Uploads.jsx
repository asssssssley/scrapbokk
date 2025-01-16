import React, { useState, useEffect } from 'react';
import { Button, styled } from '@mui/material';
import { darkTheme, lightTheme } from '../Theme/theme';
import useDarkMode from "../../context/useDarkMode";
import imageCompression from 'browser-image-compression';
import useAuth from "../../context/useAuth";
import { useParams } from "react-router-dom";

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
  const { user } = useAuth();
  const { id } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { isDarkMode } = useDarkMode();
  const currentTheme = !isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const fetchCustomAssets = async () => {
      try {
        const url = `http://localhost:5001/assets?email=${user}&id=${id}`;
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const responseData = await res.json();
        setUploadedFiles(responseData.assets || []);
      } catch (error) {
        console.error('Error fetching custom assets:', error);
      }
    };

    fetchCustomAssets();
  }, [id]);

  const handleFileUpload = async (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      const filePromises = Array.from(files).map(async (file) => {
        try {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true,
          };

          const compressedFile = await imageCompression(file, options);
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(compressedFile);
          });
        } catch (error) {
          console.error('Error compressing file:', error);
        }
      });

      try {
        const fileArray = await Promise.all(filePromises);

        const data = {
          email: user,
          id,
          assets: fileArray,
        };

        const url = 'http://localhost:5001/upload';

        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(data),
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const responseData = await res.json();
        setUploadedFiles((prev) => [
          ...prev,
          ...fileArray,
        ]);
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    }
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const itemStyle = {
    width: '100px',
    height: 'auto',
    padding: '5px',
    objectFit: 'contain',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button
        component="label"
        variant="contained"
        sx={{
          padding: "10px",
          marginTop: "20px",
          fontSize: "1rem",
          backgroundColor: currentTheme.palette.background.default,
          color: currentTheme.palette.text.primary,
          '&:hover': {
            backgroundColor: currentTheme.palette.text.primary,
            color: currentTheme.palette.background.default,
          },
        }}
      >
        Upload
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileUpload}
          multiple
          accept="image/*"
        />
      </Button>

      <div style={{ marginTop: '20px' }}>
        <div style={containerStyle}>
          {uploadedFiles.map((file, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'center'}}>
              <img src={file} alt={`Uploaded file ${index}`} style={itemStyle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Uploads;
