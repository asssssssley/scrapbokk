import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!Cookies.get("jwt");
  });

  const login = (googleToken) => {
    Cookies.set("jwt", googleToken, { expires: 7, path: "" });
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      const token = Cookies.get("jwt");

      if (!token) {
        console.log("No token found in cookies");
        return;
      }

      const res = await fetch("http://localhost:5001/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      console.log("Logout successful:", data);
      Cookies.remove("jwt");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!Cookies.get("jwt"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const googleSignIn = (response) => {
    if (response?.tokenId) {
      login(response.tokenId);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
