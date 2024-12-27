require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { signin, checkAuth, logout } = require("./src/auth");

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

// sign in route
app.post("/signin", signin);

// check auth route
app.get("/checkAuth", checkAuth, (req, res) => {
  res.json({ message: "Authenticated", user: req.user });
});

// logout route
app.get("/logout", logout);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
