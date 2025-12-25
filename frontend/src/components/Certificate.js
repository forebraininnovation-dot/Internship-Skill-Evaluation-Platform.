const express = require("express");
const db = require("../config/db");
const PDFDocument = require("pdfkit");

const router = express.Router();

/**
 * Generate certificate ONLY if task is completed
 */
router.get("/generate/:userId/:taskId", (req, res) => {
  const { userId, taskId } = req.params;

  // 1. Check task status
  db.query(
    "SELECT t.title, u.name FROM tasks t JOIN users u ON t.user_id = u.id WHERE t.id=? AND t.user_id=? AND t.status='completed'",
    [taskId, userId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0)
        return res.status(400).send("Task not completed");

      const { title, name } = result[0];

      // 2. Insert certificate record
      db.query(
        "INSERT INTO certificates (user_id, task_id, issued_date) VALUES (?,?,CURDATE())",
        [userId, taskId]
      );

      // 3. Create PDF
      const doc = new PDFDocument({ size: "A4", margin: 50 });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=certificate.pdf");

      doc.pipe(res);

      doc.fontSize(26).text("CERTIFICATE OF COMPLETION", { align: "center" });
      doc.moveDown(2);

      doc.fontSize(16).text(`This is to certify that`, { align: "center" });
      doc.moveDown(1);

      doc.fontSize(22).text(name, { align: "center", underline: true });
      doc.moveDown(1);

      doc.fontSize(16).text(
        `has successfully completed the task titled`,
        { align: "center" }
      );
      doc.moveDown(1);

      doc.fontSize(18).text(`"${title}"`, { align: "center", italics: true });
      doc.moveDown(2);

      doc.fontSize(14).text(
        `Issued on: ${new Date().toDateString()}`,
        { align: "center" }
      );

      doc.end();
    }
  );
});

module.exports = router;
