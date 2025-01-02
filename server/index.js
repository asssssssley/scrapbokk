require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { signin } = require("./src/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// sign in route
app.post("/signin", signin);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
