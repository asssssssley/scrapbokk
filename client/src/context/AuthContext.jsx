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

  const logout = () => {
    Cookies.remove("jwt");
    setIsAuthenticated(false);
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
