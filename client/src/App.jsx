import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import useAuth from "./context/useAuth";
import Landing from "./components/Landing/Landing";
import Signin from "./components/Signin/Signin";
import Dashboard from "./components/Dashboard/Dashboard";
import Scrapbook from "./components/Scrapbook/Scrapbook";
import ErrorPage from "./components/Error/ErrorPage";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signin type="login" />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signin type="singup" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Landing />} />
          <Route path="/scrapbook/:id" element={isAuthenticated ? <Scrapbook /> : <Landing />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
};

export default App;
