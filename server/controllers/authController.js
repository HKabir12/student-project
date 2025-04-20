const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log("Incoming Data:", req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, role || "student"], (err, result) => {
      if (err) {
        console.error("Insert Error:", err);
        return res.status(500).json({ error: "User insert failed", detail: err });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error("Catch Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
