import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import thumbnailImg from "../../assets/thumbnail-placeholder.jpg";
import { useNavigate } from 'react-router-dom';

const ScrapbookDisplay = ({ scrapbooks, onDelete }) => {
  const navigate = useNavigate();
  const [selectedScrapbook, setSelectedScrapbook] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const getScrapbook = (id) => {
    navigate(`/scrapbook/${id}`);
  };

  const handleRightClick = (event, scrapbook) => {
    event.preventDefault();
    setSelectedScrapbook(scrapbook);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleDelete = () => {
    if (onDelete && selectedScrapbook) {
      onDelete(selectedScrapbook.id);
    }
    setSelectedScrapbook(null);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedScrapbook && !event.target.closest('.context-menu')) {
        setSelectedScrapbook(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedScrapbook]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        paddingTop: { xs: '5rem', sm: '7rem', md: '9rem' },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          justifyContent: 'center',
        }}
      >
        {scrapbooks.map((scrapbook, index) => (
          <Card
            onClick={() => getScrapbook(scrapbook.id)}
            onContextMenu={(e) => handleRightClick(e, scrapbook)}
            key={index}
            sx={{
              width: { xs: 200, sm: 250, md: 300 },
              height: { xs: 200, sm: 250, md: 300 },
              padding: 2,
              borderRadius: 5,
              boxShadow: 3,
            }}
          >
            <CardMedia
              component="img"
              sx={{
                borderRadius: 5,
                height: { xs: 100, sm: 150, md: 200 },
              }}
              image={scrapbook.img || thumbnailImg}
              alt="scrapbook-thumbnail"
            />
            <CardContent sx={{ padding: 1 }}>
              <Typography variant="h6" component="div">
                {scrapbook.title.length > 18
                  ? `${scrapbook.title.slice(0, 18)}...`
                  : scrapbook.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {scrapbook.pages.length} pages
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Delete button */}
      {selectedScrapbook && (
        <Button
          className="context-menu"
          onClick={handleDelete}
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
      )}
    </Box>
  );
};

export default ScrapbookDisplay;
