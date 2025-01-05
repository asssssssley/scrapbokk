const fs = require("fs");
const path = require("path");

const databasePath = path.join(__dirname, "database.json");

const readDatabase = () => {
  try {
    const data = fs.readFileSync(databasePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database", error);
    return [];
  }
};

const writeDatabase = (data) => {
  try {
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to database", error);
  }
};

// check and verify jwt in cookies
const checkAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { readDatabase, writeDatabase, checkAuth };