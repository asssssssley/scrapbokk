const { readDatabase, writeDatabase } = require('./helper');

const getScrapbooks = (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const userScrapbooks = user.scrapbooks
    .map((scrapbookId) =>
      db.scrapbooks.find((scrapbook) => scrapbook.id === scrapbookId)
    )
    .filter(Boolean);

  return res.status(200).json(userScrapbooks);
};

const getScrapbook = (req, res) => {
  const { userId, scrapbookId } = req.query;

  if (!scrapbookId) {
    return res.status(400).json({ error: "Scrapbook ID is required" });
  }

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!user.scrapbooks.includes(scrapbookId)) {
    return res.status(403).json({ error: "You do not have access to this scrapbook" });
  }

  const scrapbook = db.scrapbooks.find((s) => s.id === scrapbookId);

  if (!scrapbook) {
    return res.status(404).json({ error: "Scrapbook not found" });
  }

  return res.status(200).json(scrapbook);
};

const createScrapbook = (req, res) => {
  const { userId, title, img, color } = req.body;

  const db = readDatabase();
  const user = db.users.find((u) => u.email === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const newScrapbook = {
    id: `${Date.now()}`,
    title,
    img,
    color,
    customAssets: [],
    pages: [{ id: `${Date.now()}`, assets: {} }],
  };

  user.scrapbooks.push(newScrapbook.id);
  db.scrapbooks.push(newScrapbook);

  writeDatabase(db);

  return res.status(201).json({
    message: "Scrapbook created successfully",
    id: newScrapbook.id,
  });
};

const updateScrapbook = (req, res) => {
  const { userId, scrapbookId, title, img, color } = req.body;

  const db = readDatabase();
  const user = db.users.find((u) => u.email === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const scrapbook = db.scrapbooks.find((s) => s.id === scrapbookId);

  if (!scrapbook) {
    return res.status(404).json({ error: "Scrapbook not found" });
  }

  if (!user.scrapbooks.includes(scrapbookId)) {
    return res.status(403).json({ error: "You do not have access to this scrapbook" });
  }

  if (title) scrapbook.title = title;
  if (img) scrapbook.img = img;
  if (color) scrapbook.color = color;

  writeDatabase(db);

  return res.status(200).json({
    message: "Scrapbook updated successfully",
    id: scrapbookId,
  });
};

const deleteScrapbook = (req, res) => {
  const { userId, scrapbookId } = req.body;

  if (!scrapbookId) {
    return res.status(400).json({ error: "Scrapbook ID is required" });
  }

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!user.scrapbooks.includes(scrapbookId)) {
    return res.status(403).json({ error: "You do not have access to this scrapbook" });
  }

  const usersWithAccess = db.users.filter((u) => u.scrapbooks.includes(scrapbookId));

  if (usersWithAccess.length > 1) {
    user.scrapbooks = user.scrapbooks.filter(id => id !== scrapbookId);

    writeDatabase(db);

    return res.status(200).json({ message: "Scrapbook removed from your list but still available for others" });
  }

  user.scrapbooks = user.scrapbooks.filter(id => id !== scrapbookId);

  const scrapbookIndex = db.scrapbooks.findIndex((s) => s.id === scrapbookId);
  if (scrapbookIndex !== -1) {
    db.scrapbooks.splice(scrapbookIndex, 1);
  }

  writeDatabase(db);

  return res.status(200).json({ message: "Scrapbook deleted successfully" });
};

const uploadCustomAssets = (req, res) => {
  const { userId, scrapbookId, assets } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!scrapbookId) {
    return res.status(400).json({ error: "Scrapbook ID is required" });
  }

  if (!assets || !Array.isArray(assets)) {
    return res.status(400).json({ error: "Assets must be an array" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const scrapbook = db.scrapbooks.find((s) => s.id === scrapbookId);

  if (!scrapbook) {
    return res.status(404).json({ error: "Scrapbook not found" });
  }

  if (!user.scrapbooks.includes(scrapbookId)) {
    return res.status(403).json({ error: "You do not have access to this scrapbook" });
  }

  scrapbook.customAssets.push(...assets);

  writeDatabase(db);

  return res.status(200).json({
    message: "Custom assets uploaded successfully",
    assets: scrapbook.customAssets,
  });
};

const getCustomAssets = (req, res) => {
  const { userId, scrapbookId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!scrapbookId) {
    return res.status(400).json({ error: "Scrapbook ID is required" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const scrapbook = db.scrapbooks.find((s) => s.id === scrapbookId);

  if (!scrapbook) {
    return res.status(404).json({ error: "Scrapbook not found" });
  }

  if (!user.scrapbooks.includes(scrapbookId)) {
    return res.status(403).json({ error: "You do not have access to this scrapbook" });
  }

  return res.status(200).json({
    assets: scrapbook.customAssets || [],
  });
};

const addPage = (req, res) => {
  const { userId, scrapbookId } = req.body;

  if (!scrapbookId) {
    return res.status(400).json({ error: "Scrapbook ID is required" });
  }

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const scrapbook = db.scrapbooks.find((s) => s.id === scrapbookId);

  if (!scrapbook) {
    return res.status(404).json({ error: "Scrapbook not found" });
  }

  if (!user.scrapbooks.includes(scrapbookId)) {
    return res.status(403).json({ error: "You do not have access to this scrapbook" });
  }

  const newPage = {
    id: `${Date.now()}`,
    assets: {},
  };

  scrapbook.pages.push(newPage);

  writeDatabase(db);

  return res.status(201).json({ message: "Page added successfully", page: newPage });
};

const deletePage = (req, res) => {
  const { userId, scrapbookId, pageId } = req.body;

  if (!scrapbookId) {
    return res.status(400).json({ error: "Scrapbook ID is required" });
  }

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!pageId) {
    return res.status(400).json({ error: "Page ID is required" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const scrapbook = db.scrapbooks.find((s) => s.id === scrapbookId);

  if (!scrapbook) {
    return res.status(404).json({ error: "Scrapbook not found" });
  }

  if (!user.scrapbooks.includes(scrapbookId)) {
    return res.status(403).json({ error: "You do not have access to this scrapbook" });
  }

  const pageIndex = scrapbook.pages.findIndex((p) => p.id === pageId);

  if (pageIndex === -1) {
    return res.status(404).json({ error: "Page not found" });
  }

  scrapbook.pages.splice(pageIndex, 1);

  writeDatabase(db);

  return res.status(200).json({ message: "Page deleted successfully" });
};

const rearrangePages = (req, res) => {
  const { userId, scrapbookId, newPageOrder } = req.body;

  if (!scrapbookId) {
    return res.status(400).json({ error: "Scrapbook ID is required" });
  }

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!newPageOrder || !Array.isArray(newPageOrder)) {
    return res.status(400).json({ error: "New page order is required and must be an array" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const scrapbook = db.scrapbooks.find((s) => s.id === scrapbookId);

  if (!scrapbook) {
    return res.status(404).json({ error: "Scrapbook not found" });
  }

  if (!user.scrapbooks.includes(scrapbookId)) {
    return res.status(403).json({ error: "You do not have access to this scrapbook" });
  }

  if (newPageOrder.length !== scrapbook.pages.length) {
    return res.status(400).json({ error: "New page order does not match the number of pages in the scrapbook" });
  }

  scrapbook.pages = newPageOrder.map((pageId) =>
    scrapbook.pages.find((page) => page.id === pageId)
  );

  writeDatabase(db);

  return res.status(200).json({ message: "Pages rearranged successfully", pages: scrapbook.pages });
};

module.exports = { getScrapbooks, getScrapbook, createScrapbook, updateScrapbook, deleteScrapbook, uploadCustomAssets, getCustomAssets, addPage, deletePage, rearrangePages };
