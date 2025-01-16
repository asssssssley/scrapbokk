const { readDatabase, writeDatabase } = require('./helper');

const getScrapbooks = (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const userScrapbooks = user.scrapbooks
    .map((scrapbookId) =>
      db.scrapbooks.find((scrapbook) => scrapbook.id === scrapbookId.toString())
    )
    .filter(Boolean);

  return res.status(200).json(userScrapbooks);
};

const getScrapbook = (req, res) => {
  const { email, id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Scrapbook ID is required" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!user.scrapbooks.includes(id)) {
    return res.status(403).json({ error: "You do not have access to this scrapbook" });
  }

  const scrapbook = db.scrapbooks.find((s) => s.id === id);

  if (!scrapbook) {
    return res.status(404).json({ error: "Scrapbook not found" });
  }

  return res.status(200).json(scrapbook);
};

const createScrapbook = (req, res) => {
  const { email, name, thumbnail, background } = req.body;

  const db = readDatabase();
  const user = db.users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const newScrapbook = {
    id: (db.scrapbooks.length + 1).toString(),
    title: name,
    img: thumbnail,
    color: background,
    customAssets: [],
    pages: [{ number: "1", assets: {} }]
  };

  user.scrapbooks.push(newScrapbook.id);

  db.scrapbooks.push(newScrapbook);

  writeDatabase(db);

  return res.status(201).json({ message: "Scrapbook created successfully", id: newScrapbook.id });
};

const updateScrapbook = (req, res) => {
  const { email, id, name, thumbnail, background } = req.body;

  const db = readDatabase();
  const user = db.users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const scrapbook = db.scrapbooks.find((s) => s.id === id);

  if (!scrapbook) {
    return res.status(404).json({ error: "Scrapbook not found" });
  }

  if (!user.scrapbooks.includes(id)) {
    return res.status(403).json({ error: "You do not have access to this scrapbook" });
  }

  scrapbook.title = name || scrapbook.title;
  scrapbook.img = thumbnail || scrapbook.img;
  scrapbook.color = background || scrapbook.color;

  writeDatabase(db);

  return res.status(201).json({ message: "Scrapbook updated successfully", id: id });
};

const deleteScrapbook = (req, res) => {
  const { email, id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Scrapbook ID is required" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!user.scrapbooks.includes(id)) {
    return res.status(403).json({ error: "You do not have access to this scrapbook" });
  }

  const usersWithAccess = db.users.filter((u) => u.scrapbooks.includes(id));

  if (usersWithAccess.length > 1) {
    user.scrapbooks = user.scrapbooks.filter(scrapbookId => scrapbookId !== id);

    writeDatabase(db);

    return res.status(200).json({ message: "Scrapbook removed from your list but still available for others" });
  }

  user.scrapbooks = user.scrapbooks.filter(scrapbookId => scrapbookId !== id);

  const scrapbookIndex = db.scrapbooks.findIndex((s) => s.id === id);
  if (scrapbookIndex !== -1) {
    db.scrapbooks.splice(scrapbookIndex, 1);
  }

  writeDatabase(db);

  return res.status(200).json({ message: "Scrapbook deleted successfully" });
};

const uploadCustomAssets = (req, res) => {
  const { email, id, assets } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!id) {
    return res.status(400).json({ error: "Scrapbook ID is required" });
  }

  if (!assets || !Array.isArray(assets)) {
    return res.status(400).json({ error: "Assets must be an array" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const scrapbook = db.scrapbooks.find((s) => s.id === id);

  if (!scrapbook) {
    return res.status(404).json({ error: "Scrapbook not found" });
  }

  if (!user.scrapbooks.includes(id)) {
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
  const { email, id } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!id) {
    return res.status(400).json({ error: "Scrapbook ID is required" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const scrapbookData = db.scrapbooks.find((s) => s.id === id);

  if (!scrapbookData) {
    return res.status(404).json({ error: "Scrapbook not found" });
  }

  if (!user.scrapbooks.includes(id)) {
    return res.status(403).json({ error: "You do not have access to this scrapbook" });
  }

  return res.status(200).json({
    assets: scrapbookData.customAssets || [],
  });
};

const addPage = (req, res) => {
  const { email, id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Scrapbook ID is required" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const scrapbook = db.scrapbooks.find((s) => s.id === id);

  if (!scrapbook) {
    return res.status(404).json({ error: "Scrapbook not found" });
  }

  if (!user.scrapbooks.includes(id)) {
    return res.status(403).json({ error: "You do not have access to this scrapbook" });
  }

  const newPage = {
    number: (scrapbook.pages.length + 1).toString(),
    assets: {},
  };

  scrapbook.pages.push(newPage);

  writeDatabase(db);

  return res.status(201).json({ message: "Page added successfully", page: newPage });
};

const deletePage = (req, res) => {
  const { email, id, pageNumber } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Scrapbook ID is required" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!pageNumber) {
    return res.status(400).json({ error: "Page number is required" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const scrapbook = db.scrapbooks.find((s) => s.id === id);

  if (!scrapbook) {
    return res.status(404).json({ error: "Scrapbook not found" });
  }

  if (!user.scrapbooks.includes(id)) {
    return res.status(403).json({ error: "You do not have access to this scrapbook" });
  }

  const pageIndex = scrapbook.pages.findIndex((p) => p.number === pageNumber);

  if (pageIndex === -1) {
    return res.status(404).json({ error: "Page not found" });
  }

  scrapbook.pages.splice(pageIndex, 1);

  scrapbook.pages.forEach((page, index) => {
    page.number = (index + 1).toString();
  });

  writeDatabase(db);

  return res.status(200).json({ message: "Page deleted successfully" });
};

const rearrangePages = (req, res) => {
  const { email, id, newPageOrder } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Scrapbook ID is required" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!newPageOrder || !Array.isArray(newPageOrder)) {
    return res.status(400).json({ error: "New page order is required and must be an array" });
  }

  const db = readDatabase();
  const user = db.users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const scrapbook = db.scrapbooks.find((s) => s.id === id);

  if (!scrapbook) {
    return res.status(404).json({ error: "Scrapbook not found" });
  }

  if (!user.scrapbooks.includes(id)) {
    return res.status(403).json({ error: "You do not have access to this scrapbook" });
  }

  if (newPageOrder.length !== scrapbook.pages.length) {
    return res.status(400).json({ error: "New page order does not match the number of pages in the scrapbook" });
  }

  scrapbook.pages = newPageOrder.map((pageNumber) =>
    scrapbook.pages.find((page) => page.number === pageNumber)
  );

  scrapbook.pages.forEach((page, index) => {
    page.number = (index + 1).toString();
  });

  writeDatabase(db);

  return res.status(200).json({ message: "Pages rearranged successfully", pages: scrapbook.pages });
};


module.exports = { getScrapbooks, getScrapbook, createScrapbook, updateScrapbook, deleteScrapbook, uploadCustomAssets, getCustomAssets, addPage, deletePage, rearrangePages };
