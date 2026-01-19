const express = require("express");
const db = require("../db");

const router = express.Router();

// REGISTER
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Missing data" });
    return;
  }

  const checkQuery = "SELECT id FROM users WHERE username = ?";
  db.query(checkQuery, [username], (err, result) => {
    if (err) {
      res.status(500).json(err);
      return;
    }

    if (result.length > 0) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const insertQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(insertQuery, [username, password], (err2, result2) => {
      if (err2) {
        res.status(500).json(err2);
        return;
      }

      res.json({ message: "User registered", id: result2.insertId });
    });
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query =
    "SELECT id, username FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500).json(err);
      return;
    }

    if (result.length === 0) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    res.json({ message: "Login success", user: result[0] });
  });
});

module.exports = router;
