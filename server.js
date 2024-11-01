const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const blogRoute = require("./routes/blogRoutes");
const cookie = require("cookie-parser");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(cookie());
app.use(express.static(path.resolve(__dirname, "frontend", "dist")));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Export the app for Vercel
module.exports = app;
