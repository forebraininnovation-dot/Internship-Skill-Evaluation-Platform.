const express = require("express");
const db = require("../config/db");
const router = express.Router();

/* ===== USER SUBMITS FORM ===== */
router.post("/submit", (req, res) => {
  const { title, description, user_id } = req.body;

  db.query(
    "INSERT INTO tasks (title, description, user_id, status) VALUES (?, ?, ?, 'assigned')",
    [title, description, user_id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Form submission failed");
      }
      res.json({ taskId: result.insertId });
    }
  );
});

/* ===== MARK TASK COMPLETED ===== */
router.put("/complete/:taskId", (req, res) => {
  db.query(
    "UPDATE tasks SET status='completed' WHERE id=?",
    [req.params.taskId],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Task marked as completed");
    }
  );
});

/* ===== GET USER TASKS ===== */
router.get("/:userId", (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE user_id=?",
    [req.params.userId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

module.exports = router;
