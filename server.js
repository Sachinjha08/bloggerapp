const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");

const app = express();

const PORT = process.env.PORT || 7000;

// Serve static files from the 'frontend/dist' directory
app.use(express.static(path.resolve(__dirname, "frontend", "dist")));

// Root route to serve index.html
app.get("/", (req, res) => {
  try {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  } catch (error) {
    console.error("Error sending index.html:", error);
    res.status(500).send("Server error occurred while loading the page.");
  }
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
