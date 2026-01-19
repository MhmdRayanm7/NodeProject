const express = require("express");
const db = require("../db");

const router = express.Router();

// GET ALL
router.get("/", (req, res) => {
  db.query("SELECT * FROM levels", (err, result) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json(result);
  });
});

// ADD
router.post("/", (req, res) => {
  const { level_name, difficulty, description } = req.body;

  const query =
    "INSERT INTO levels (level_name, difficulty, description) VALUES (?, ?, ?)";
  db.query(query, [level_name, difficulty, description], (err, result) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json({ message: "Level added", id: result.insertId });
  });
});
// UPDATE
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { level_name, difficulty, description } = req.body;

  const query =
    "UPDATE levels SET level_name = ?, difficulty = ?, description = ? WHERE id = ?";

  db.query(query, [level_name, difficulty, description, id], (err) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json({ message: "Level updated" });
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM levels WHERE id = ?", [id], (err) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json({ message: "Level deleted" });
  });
});

module.exports = router;
