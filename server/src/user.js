const fs = require("fs");
const path = require("path");

const databasePath = path.join(__dirname, "database.json");

const readDatabase = () => {
  try {
    const data = fs.readFileSync(databasePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return { users: [], scrapbooks: [] };
  }
};

const writeDatabase = (data) => {
  try {
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to database:", error);
  }
};

const getScrapbooks = (req, res) => {
  const email = "rokika.kh1@gmail.com";

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

module.exports = { getScrapbooks };
