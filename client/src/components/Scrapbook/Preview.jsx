import React, { useRef } from "react";
import useDarkMode from "../../context/useDarkMode";
import { darkTheme, lightTheme } from "../Theme/theme";
import useAuth from "../../context/useAuth";
import { useParams } from "react-router-dom";
import AddPageButton from "./AddPageButton";

const Preview = ({ page, scrapbook, onPageClick, setScrapbook }) => {
  const { user } = useAuth();
  const { id } = useParams();
  const { darkMode } = useDarkMode();
  const itemSize = { width: "60px", height: "30px", flexShrink: 0 };

  const containerRef = useRef(null);

  const handleAddPage = async () => {
    try {
      const res = await fetch("http://localhost:5001/addPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user,
          id: id,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const responseData = await res.json();
      const newPage = responseData.page;

      setScrapbook((prevScrapbook) => ({
        ...prevScrapbook,
        pages: [...prevScrapbook.pages, newPage],
      }));

      onPageClick(newPage.number);

      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollLeft = containerRef.current.scrollWidth;
        }
      }, 0);
    } catch (error) {
      console.error("Error adding page:", error);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          flexWrap: "nowrap",
          overflowX: "auto",
          margin: "20px",
          width: "800px",
          alignItems: "center",
          scrollBehavior: "smooth",
        }}
      >
        {scrapbook.pages.map((pageObj, index) => (
          <div
            key={index}
            onClick={() => onPageClick(pageObj.number)}
            style={{
              ...itemSize,
              backgroundColor: scrapbook.backgroundColor,
              color: scrapbook.textColor,
              padding: "5px",
              textAlign: "center",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderColor: pageObj.number === page
                ? (darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary)
                : "none",
              borderStyle: pageObj.number === page ? "solid" : "none",
              borderWidth: "4px",
            }}
          >
            {pageObj.number}
          </div>
        ))}
      </div>

      <AddPageButton handleAddPage={handleAddPage} />
    </div>
  );
};

export default Preview;
