const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Database connection (db.js থেকে)

// ➔ সব টিচার দেখাবে
router.get("/teachers", (req, res) => {
  const sql = "SELECT * FROM teachers";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching teachers:", err);
      return res.status(500).json({ message: "Database Error" });
    }
    res.json(results);
  });
});

// ➔ নতুন টিচার যোগ করবে
router.post("/teachers", (req, res) => {
  const { name, department, email } = req.body;

  if (!name || !department || !email) {
    return res
      .status(400)
      .json({ message: "Please provide name, department, and email" });
  }

  const sql = "INSERT INTO teachers (name, department, email) VALUES (?, ?, ?)";
  db.query(sql, [name, department, email], (err, result) => {
    if (err) {
      console.error("Error inserting teacher:", err);
      return res.status(500).json({ message: "Database Error" });
    }
    res
      .status(201)
      .json({ message: "Teacher added successfully", id: result.insertId });
  });
});

// ➔ নির্দিষ্ট টিচার খুঁজবে ID দিয়ে
router.get("/teachers/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM teachers WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error finding teacher:", err);
      return res.status(500).json({ message: "Database Error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(results[0]);
  });
});

// ➔ টিচার ডিলিট করবে
router.delete("/teachers/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM teachers WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting teacher:", err);
      return res.status(500).json({ message: "Database Error" });
    }
    res.json({ message: "Teacher deleted successfully" });
  });
});

// ➔ টিচার আপডেট করবে
router.put("/teachers/:id", (req, res) => {
  const { id } = req.params;
  const { name, department, email } = req.body;

  const sql =
    "UPDATE teachers SET name = ?, department = ?, email = ? WHERE id = ?";
  db.query(sql, [name, department, email, id], (err, result) => {
    if (err) {
      console.error("Error updating teacher:", err);
      return res.status(500).json({ message: "Database Error" });
    }
    res.json({ message: "Teacher updated successfully" });
  });
});

module.exports = router;
