const express = require("express");
const db = require("../db");

const router = express.Router();

// GET ALL
router.get("/", (req, res) => {
  const query = `
    SELECT p.id, u.username, l.level_name, p.completed, p.time_spent
    FROM player_progress p
    JOIN users u ON u.id = p.user_id
    JOIN levels l ON l.id = p.level_id
  `;

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json(result);
  });
});

// ADD
router.post("/", (req, res) => {
  const { user_id, level_id, completed, time_spent } = req.body;

  const query =
    "INSERT INTO player_progress (user_id, level_id, completed, time_spent) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [user_id, level_id, completed, time_spent],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.json({ message: "Progress added", id: result.insertId });
    }
  );
});

// UPDATE
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { completed, time_spent } = req.body;

  const query =
    "UPDATE player_progress SET completed = ?, time_spent = ? WHERE id = ?";

  db.query(query, [completed, time_spent, id], (err) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json({ message: "Progress updated" });
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM player_progress WHERE id = ?", [id], (err) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json({ message: "Progress deleted" });
  });
});


module.exports = router;
