export const fetchScrapbooks = async (userId, setScrapbooks) => {
  try {
    const res = await fetch(`http://localhost:5001/scrapbooks?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const data = await res.json();
    setScrapbooks(data);
  } catch (error) {
    console.error("Error fetching scrapbooks:", error);
  }
};

export const deleteScrapbook = async (userId, scrapbookId, setScrapbooks) => {
  try {
    const res = await fetch("http://localhost:5001/scrapbook", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        scrapbookId: scrapbookId,
      }),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Failed to delete scrapbook: ${res.status}`);
    }

    setScrapbooks((prevScrapbooks) => prevScrapbooks.filter((scrapbook) => scrapbook.id !== scrapbookId));
  } catch (error) {
    console.error("Error deleting scrapbook:", error);
  }
};

export const createScrapbook = async (userId, title, img, color) => {
  try {
    const data = { userId, title, img, color };

    const res = await fetch("http://localhost:5001/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error creating scrapbook:", error);
    throw error;
  }
};

export const updateScrapbook = async (userId, scrapbookId, title, img, color) => {
  try {
    const data = { userId, scrapbookId, title, img, color };
    const res = await fetch("http://localhost:5001/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error updating scrapbook:", error);
    throw error;
  }
};

