import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import useAuth from "./context/useAuth";
import Landing from "./components/Landing/Landing";
import Signin from "./components/Signin/Signin";
import Dummy from "./components/Dummy";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <DarkModeProvider>
      <Router> 
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signin type="login" />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signin type="singup" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dummy /> : <Landing />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
};

export default App;