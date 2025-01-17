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

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const pageRefs = useRef([]);

  const handleRightClick = (e, pageId) => {
    e.preventDefault();
    setMousePosition({ x: e.clientX, y: e.clientY });
    setSelectedPageId(pageId);
    setShowDeleteButton(true);
  };

  const handlePageClick = (index) => {
    onPageClick(index);
  };

  useEffect(() => {
    if (pageRefs.current[page]) {
      pageRefs.current[page].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [page]);

  const handleDeletePage = async () => {
    if (!selectedPageId) return;

    const updatedPages = pages.filter(page => page.id !== selectedPageId);
    await deletePage(user, id, selectedPageId);
    setPages(updatedPages);

    if (updatedPages.length === 0) {
      await handleAddPage();
    } else {
      const newSelectedIndex = pages.length === 1 ? 0 : Math.max(0, pages.findIndex(page => page.id === selectedPageId) - 1);
      onPageClick(newSelectedIndex);
    }

    setShowDeleteButton(false);
  };

  const handleAddPage = async () => {
    try {
      const newPage = await addPage({ userId: user, scrapbookId: id });
      setPages((prevPages) => {
        const updatedPages = [...prevPages, newPage];
        onPageClick(updatedPages.length - 1);
        return updatedPages;
      });
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
            onClick={() => handlePageClick(index)}
            onContextMenu={(e) => handleRightClick(e, pageObj.id)}
            style={getPageStyles(index)}
            ref={(el) => (pageRefs.current[index] = el)}
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
