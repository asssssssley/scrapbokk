import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
} from "@mui/material";
import RotatingCards from "./RotatingCards";

const Landing = () => {
  const [currentDuck, setCurrentDuck] = React.useState("duck1");
  const [activeCard, setActiveCard] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDuck((prevImage) => (prevImage === "duck1" ? "duck2" : "duck1"));
    }, 1000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ minHeight: "100vh", width: "100vw", backgroundColor: "#F4EED8", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "90px" }}>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button 
            variant="outlined" 
            sx={{ 
              margin: 2,
              marginRight: 1, 
              borderRadius: "20px", 
              border: "2px solid #5C6B42", 
              color: "#5C6B42", 
              fontWeight: "bold", 
              padding: 1, 
              paddingLeft: 3, 
              paddingRight: 3,
              "&:hover": { 
                border: "2px solid #93A072",  
                color: "#93A072",             
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
            Sign up
          </Button>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button 
            variant="outlined" 
            sx={{ 
              margin: 2, 
              marginLeft: 1, 
              borderRadius: "20px", 
              backgroundColor: "#5C6B42", 
              border: "2px solid #5C6B42", 
              color: "#F4EED8", 
              fontWeight: "bold", 
              padding: 1, 
              paddingLeft: 3, 
              paddingRight: 3,
              "&:hover": { 
                backgroundColor: "#93A072", 
                border: "2px solid #93A072",  
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
            Log in
          </Button>
        </Link>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center",flexDirection: "column", flexGrow: 1 }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: "bold", 
              color: "#5C6B42", 
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" } 
            }} 
          >
            Scrapbokk
          </Typography>
          <img
            src={currentDuck === "duck1" ? "/duck_normal.png" : "/duck_open.png"}
            alt="logo"
            style={{ width: "10%", height: "auto", paddingLeft: "10px", maxWidth: "100px" }}
          />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: "bold", 
              color: "#5C6B42", 
              position: "relative", 
              top: "-50px", 
              left: "-20px",
              transform: "rotate(-20deg)",
              transformOrigin: "center", 
            }} 
          >
            Quack!
          </Typography>
        </div>
        <Typography sx={{ width: "30%", paddingTop: "20px", color: "#5C6B42", textAlign: "center" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis tortor eget erat euismod dictum nec in mauris. In hac.
        </Typography>
        <RotatingCards />
      </div>
    </div>
  );
};

export default Landing;
