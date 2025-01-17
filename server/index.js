require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { checkAuth } = require('./src/helper');
const { signin, logout } = require("./src/auth");
const {
  getScrapbook,
  getScrapbooks,
  createScrapbook,
  updateScrapbook,
  deleteScrapbook,
  uploadCustomAssets,
  getCustomAssets,
  addPage,
  deletePage,
  rearrangePages
} = require("./src/user");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

// sign in
app.post("/signin", signin);

// check auth
app.get("/checkAuth", checkAuth, (req, res) => {
  res.json({ message: "Authenticated", user: req.user });
});

// logout
app.get("/logout", logout);

// scrapbook
app.get("/scrapbook", getScrapbook);
app.get("/scrapbooks", getScrapbooks);
app.post("/create", createScrapbook);
app.post("/update", updateScrapbook);
app.delete("/scrapbook", deleteScrapbook);
app.post("/upload", uploadCustomAssets);
app.get("/assets", getCustomAssets);

// pages
app.post("/addPage", addPage);
app.post("/deletePage", deletePage);
app.post("/rearrangePages", rearrangePages);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
