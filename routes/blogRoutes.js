const express = require("express");
const verifyToken = require("../middlewares/tokenMiddleware");
const {
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getAllBlogController,
  getMyBlogController,
} = require("../controllers/blogControllers");

const router = express.Router();

// POST || Create a new blog
router.post("/create-blogs", verifyToken, createBlogController);

// PUT || Update an existing blog by ID
router.put("/update-blogs/:id", verifyToken, updateBlogController);

// DELETE || Delete a blog by ID
router.delete("/delete-blogs/:id", verifyToken, deleteBlogController);

// GET || Retrieve all blogs (public)
router.get("/get-all-blogs", getAllBlogController);

// GET || Retrieve all blogs for a specific user (logged-in user)
router.get("/get-user-blogs", verifyToken, getMyBlogController);

module.exports = router;
