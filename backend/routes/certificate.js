const express = require("express");
const db = require("../config/db");
const PDFDocument = require("pdfkit");
const router = express.Router();

router.get("/generate/:userId/:taskId", (req, res) => {
  const { userId, taskId } = req.params;

  db.query(
    `SELECT u.name, t.title
     FROM users u
     JOIN tasks t ON u.id = t.user_id
     WHERE t.id=? AND t.user_id=? AND t.status='completed'`,
    [taskId, userId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0)
        return res.status(400).send("Task not completed");

      const { name, title } = result[0];

      // insert certificate record
      db.query(
        "INSERT INTO certificates (user_id, task_id, issued_date) VALUES (?, ?, CURDATE())",
        [userId, taskId]
      );

      // generate PDF
      const doc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=certificate.pdf");

      doc.pipe(res);
      doc.fontSize(22).text("CERTIFICATE OF COMPLETION", { align: "center" });
      doc.moveDown();
      doc.fontSize(16).text("This certifies that", { align: "center" });
      doc.moveDown();
      doc.fontSize(20).text(name, { align: "center" });
      doc.moveDown();
      doc.fontSize(16).text("has successfully completed", { align: "center" });
      doc.moveDown();
      doc.fontSize(18).text(title, { align: "center" });
      doc.end();
    }
  );
});

module.exports = router;
