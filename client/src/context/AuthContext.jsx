import React from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const login = (user) => {
    setIsAuthenticated(true);
    setUser(user);
  }

  const logout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "GET",
        credentials: "include"
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setUser(null);
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  React.useEffect(() => {
    const verifyAuth = async () => {
      const response = await fetch("/checkAuth", {
        method: "GET",
        credentials: "include",
      });

      /* think this needs to be removed
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
        */

      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;