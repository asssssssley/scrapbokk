import React, { useState, useEffect } from "react";
import { 
  Box, 
  Card, 
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const cards = [
  "Card 1", "Card 2", "Card 3", "Card 4", "Card 5", 
  "Card 6", "Card 7", "Card 8", "Card 9", "Card 10"
];

const RotatingCards = () => {
  const [currentCards, setCurrentCards] = useState([0, 1, 2]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentCards((prevCards) => {
        const newCards = [...prevCards];
        newCards.push((newCards[2] + 1) % cards.length);
        newCards.shift();
        return newCards;
      });
    }, 3000); 

    return () => clearInterval(intervalId); 
  }, []);

  const handleLeftClick = () => {
    setCurrentCards((prevCards) => {
      const newCards = [...prevCards];
      newCards.unshift((newCards[0] - 1 + cards.length) % cards.length); 
      newCards.pop(); 
      return newCards;
    });
  };

  const handleRightClick = () => {
    setCurrentCards((prevCards) => {
      const newCards = [...prevCards];
      newCards.push((newCards[2] + 1) % cards.length); 
      newCards.shift();
      return newCards;
    });
  };

  return (
    <Box sx={{ display: "flex", gap: "10px", marginTop: "40px", marginBottom: "40px" }}>
      <IconButton 
        onClick={handleLeftClick} 
        sx={{ 
          position: "relative",
          "&:hover": { 
            backgroundColor: "transparent", 
            boxShadow: "none", 
          },
          "&:focus": {
            outline: "none",  
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none", 
          }
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: 40 }} />
      </IconButton>
      {currentCards.map((cardIndex, idx) => (
        <Card
          key={cardIndex}
          sx={{
            width: { xs: "200px", sm: "300px", md: "500px" }, 
            height: { xs: "100px", sm: "200px", md: "300px" }, 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.8s ease, opacity 0.8s ease, scale 0.8s ease",
            transform: `rotateY(${(idx - 1) * 30}deg) scale(${idx === 1 ? 1.1 : 0.9})`,
            opacity: idx === 1 ? 1 : 0.6, 
            backgroundColor: "#D6C8AB",
          }}
        >
          <Typography variant="h6">{cards[cardIndex]}</Typography>
        </Card>
      ))}
      <IconButton 
        onClick={handleRightClick} 
        sx={{ 
          position: "relative",
          "&:hover": { 
            backgroundColor: "transparent", 
            boxShadow: "none", 
          },
          "&:focus": {
            outline: "none",  
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none", 
          }
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
      </IconButton>
    </Box>
  );
};

export default RotatingCards;
