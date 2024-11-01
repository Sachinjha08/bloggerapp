const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/connectDB");
connectDB();
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const blogRoute = require("./routes/blogRoutes");
const cookie = require("cookie-parser");
const path = require("path");

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

const PORT = process.env.PORT || 7000;

// Serve static files from the frontend's dist folder
app.use(express.static(path.resolve(__dirname, "frontend", "dist")));

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

// Serve the index.html file for the root route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
