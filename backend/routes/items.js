const express = require("express");
const db = require("../db");

const router = express.Router();

// GET ALL
router.get("/", (req, res) => {
  db.query("SELECT * FROM items", (err, result) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json(result);
  });
});

// ADD
router.post("/", (req, res) => {
  const { item_name, power, type } = req.body;

  const query =
    "INSERT INTO items (item_name, power, type) VALUES (?, ?, ?)";
  db.query(query, [item_name, power, type], (err, result) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json({ message: "Item added", id: result.insertId });
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { item_name, power, type } = req.body;

  const query =
    "UPDATE items SET item_name = ?, power = ?, type = ? WHERE id = ?";

  db.query(query, [item_name, power, type, id], (err) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json({ message: "Item updated" });
  });
});


// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM items WHERE id = ?", [id], (err) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json({ message: "Item deleted" });
  });
});

module.exports = router;
