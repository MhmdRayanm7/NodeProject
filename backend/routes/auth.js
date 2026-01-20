const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

// REGISTER
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing data" });
  }

  db.query(
    "SELECT id FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.status(409).json({ message: "User already exists" });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json(err);

        db.query(
          "INSERT INTO users (username, password) VALUES (?, ?)",
          [username, hashedPassword],
          (err2, result2) => {
            if (err2) return res.status(500).json(err2);

            res.json({ message: "User registered" });
          }
        );
      });
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = result[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json(err);

        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        req.session.user = {
          id: user.id,
          username: user.username
        };

        res.json({ message: "Login success" });
      });
    }
  );
});

// logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});


// check session
router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.json(req.session.user);
});



module.exports = router;
