require("dotenv").config();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const SECRET_KEY = process.env.SECRET_KEY;

const client = new OAuth2Client(CLIENT_ID);

// verify the Google ID token
const verifyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    throw new Error("Invalid Google token");
  }
};

// Sigin functionality
const signin = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const user = await verifyGoogleToken(token);
    const jwtToken = jwt.sign(
      {
        sub: user.sub,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // store token in cookie
    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
      maxAge: 3600000,
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(401).json({ error: error.message });
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

// logout functionality
const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
    maxAge: 0,
  });

  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { signin, checkAuth, logout };
