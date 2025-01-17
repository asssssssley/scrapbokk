import React, { useState, useRef, useEffect } from "react";
import useDarkMode from "../../context/useDarkMode";
import { darkTheme, lightTheme } from "../Theme/theme";
import useAuth from "../../context/useAuth";
import { useParams } from "react-router-dom";
import AddPageButton from "./AddPageButton";
import { addPage, deletePage } from './ScrapbookCalls';
import DeletePageButton from "./DeletePageButton";

const Preview = ({ pages, setPages, page, onPageClick }) => {
  const { user } = useAuth();
  const { id } = useParams();
  const { darkMode } = useDarkMode();
  const containerRef = useRef(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [pages]);

  const handleRightClick = (e, pageId) => {
    e.preventDefault();
    setMousePosition({ x: e.clientX, y: e.clientY });
    setSelectedPageId(pageId);
    setShowDeleteButton(true);
  };

  const handleDeletePage = async () => {
    try {
      if (!selectedPageId) return;

      const selectedPageIndex = pages.findIndex(page => page.id === selectedPageId);
      await deletePage(user, id, selectedPageId);

      setPages(prevPages => {
        const updatedPages = prevPages.filter(page => page.id !== selectedPageId);
        return updatedPages;
      });

      if (pages.length > 1) {
        onPageClick(selectedPageIndex === pages.length ? selectedPageIndex - 1 : selectedPageIndex);
      } else {
        handleAddPage();
      }

      setShowDeleteButton(false);
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  const handleAddPage = async () => {
    try {
      const newPage = await addPage({ userId: user, scrapbookId: id });
      setPages(prevPages => [...prevPages, newPage]);
      onPageClick(pages.length);  // Set the new page as active
    } catch (error) {
      console.error("Error adding page:", error);
    }
  };

  const itemSize = { width: "60px", height: "30px", flexShrink: 0 };

  const getPageStyles = (index) => ({
    ...itemSize,
    color: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary,
    padding: "5px",
    textAlign: "center",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: index === page ? (darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary) : "none",
    borderStyle: "solid",
    borderWidth: index === page ? "4px" : "2px",
  });

  return (
    <div style={{ display: "flex", alignItems: "center" }} onClick={() => setShowDeleteButton(false)}>
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
        {pages.map((pageObj, index) => (
          <div
            key={pageObj.id}
            onClick={() => onPageClick(index)}
            onContextMenu={(e) => handleRightClick(e, pageObj.id)}
            style={getPageStyles(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <AddPageButton handleAddPage={handleAddPage} />

      {showDeleteButton && (
        <DeletePageButton
          handleDeletePage={handleDeletePage}
          anchor={showDeleteButton}
          mousePosition={mousePosition}
        />
      )}
    </div>
  );
};

export default Preview;
