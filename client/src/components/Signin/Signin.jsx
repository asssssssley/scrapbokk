import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import useAuth from "../../context/useAuth";

const Signin = ({ type }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  React.useEffect(() => {
    // initialise Google Sign-In
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId, 
        callback: handleCredentialResponse,
        scope: "openid email profile"
      });

      // render Google Sign-In button
      window.google.accounts.id.renderButton(
        document.getElementById("signinButton"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  // signin response
  const handleCredentialResponse = async (response) => {
    try {
      const token = response.credential;
    
      const res = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
    
      const data = await res.json();
      if (res.ok) {
        login(data.token);
        navigate("/dashboard");
      } else {
        console.error("Backend error:", data.error);
      }
    } catch (error) {
      console.error("Error handling Google login:", error);
    }
  };
  
  return (
    <div style={{ display: "grid", gridTemplateColumns: "70% 30%", minHeight: "100vh", height: "auto", width: "100vw" }}>
      <div style={{ backgroundColor: type === "login" ? "#5C6B42" : "#93A072", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img
          src="/duck_beige.png"
          alt="logo"
          style={{ height: "auto", paddingLeft: "10px", width: "80px", position: "relative", top: "-10px", left: "-5px" }}
        />
        {type === "login" ?  (
          <Typography variant="h6" sx={{ color: "#F4EED8" }}>... hurry up and log in</Typography>
        ) : (
          <Typography variant="h6" sx={{ color: "#F4EED8" }}>... hurry up and sign up</Typography>
        )}
      </div>
      <div style={{ backgroundColor: type === "login" ? "#93A072" : "#5C6B42", display: "flex", justifyContent: "center", alignContent: "center" }} >
        <div style={{ position: "absolute", right: "0" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button 
              variant="outlined" 
              sx={{ 
                margin: 2,
                marginRight: 1, 
                borderRadius: "20px", 
                border: "2px solid #F4EED8", 
                color: "#F4EED8", 
                fontWeight: "bold", 
                padding: 1, 
                paddingLeft: 3, 
                paddingRight: 3,
                "&:hover": { 
                  border: "2px solid #F4EED8",  
                  color: "#F4EED8",             
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
              Home
            </Button>
          </Link>
          <Link to={type === "login" ? "/signup" : "/login"} style={{ textDecoration: "none" }}>
            <Button 
              variant="outlined" 
              sx={{ 
                margin: { xs: 1, md: 2 }, 
                marginLeft: 1, 
                borderRadius: "20px", 
                backgroundColor: type === "login" ? "#5C6B42" : "#93A072", 
                border: `2px solid ${type === "login" ? "#5C6B42" : "#93A072"}`,
                color: "#F4EED8", 
                fontWeight: "bold", 
                padding: 1, 
                paddingLeft: 3, 
                paddingRight: 3,
                "&:hover": { 
                  backgroundColor: "#93A072", 
                  border: "2px solid #F4EED8",  
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
              {type === "login" ? "Sign up" : "Log in"}
            </Button>
          </Link>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} id="signinButton"></div>
      </div>
    </div>
  );
};

export default Signin;
