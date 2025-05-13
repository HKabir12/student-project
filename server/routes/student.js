const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Adjusted to point to the correct file location

// Search Student by ID or Roll
router.get('/student/:id', (req, res) => {
  const searchId = req.params.id;

  const sql = `
    SELECT * FROM students
    WHERE studentId = ? OR roll = ?
    LIMIT 1
  `;
  db.query(sql, [searchId, searchId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Student Not Found" });
    }
    res.json(result[0]);
  });
});

module.exports = router;
