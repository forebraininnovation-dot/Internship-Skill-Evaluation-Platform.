const express = require("express");
const db = require("../config/db");
const router = express.Router();

/* ========= REGISTER ========= */
router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(400).send("User already exists");
      }
      res.send("Registration successful");
    }
  );
});

/* ========= LOGIN ========= */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT id, name, email, role FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0)
        return res.status(401).send("Invalid email or password");

      res.json(result[0]); // role included
    }
  );
});

module.exports = router;
