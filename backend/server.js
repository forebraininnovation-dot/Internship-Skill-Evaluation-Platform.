const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const certRoutes = require("./routes/certificate");

const app = express();

app.use(cors());
app.use(express.json()); // VERY IMPORTANT

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/certificate", certRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
