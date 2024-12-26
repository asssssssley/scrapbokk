import React from "react";

// create a context for dark mode
const DarkModeContext = React.createContext();

export const DarkModeProvider = ({ children }) => {
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  
  const [darkMode, setDarkMode] = React.useState(savedDarkMode);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  // add dark class to html
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeContext;
