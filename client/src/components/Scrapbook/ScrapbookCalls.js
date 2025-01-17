export const getScrapbook = async (userId, scrapbookId) => {
  if (!userId || !scrapbookId) {
    throw new Error("User ID and Scrapbook ID are required");
  }

  const url = `http://localhost:5001/scrapbook?userId=${userId}&scrapbookId=${scrapbookId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const errorMsg = res.status === 404
      ? "Scrapbook not found"
      : "An error occurred while fetching the scrapbook";
    throw new Error(errorMsg);
  }

  return await res.json();
};

export const fetchCustomAssets = async (userId, scrapbookId) => {
  const url = `http://localhost:5001/assets?userId=${userId}&scrapbookId=${scrapbookId}`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const responseData = await res.json();
    return responseData.assets || [];
  } catch (error) {
    console.error('Error fetching custom assets:', error);
    throw error;
  }
};

export const uploadCustomAssets = async (data) => {
  const url = 'http://localhost:5001/upload';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};

export const addPage = async (data) => {
  try {
    const res = await fetch("http://localhost:5001/addPage", {
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
    return responseData.page;
  } catch (error) {
    console.error("Error adding page:", error);
    throw error;
  }
};

export const deletePage = async (userId, scrapbookId, pageId) => {
  try {
    const res = await fetch('http://localhost:5001/deletePage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, scrapbookId, pageId }),
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`Error deleting page: ${res.status}`);
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

