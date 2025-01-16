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
    pages: []
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

module.exports = { getScrapbooks, getScrapbook, createScrapbook, updateScrapbook };
