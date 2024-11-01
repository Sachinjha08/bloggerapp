const userModel = require("../models/userModel");
const blogModel = require("../models/blogModel");

// Create Blog Controller
exports.createBlogController = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, img, dsc } = req.body;

    if (!title) {
      return res.status(400).send({
        message: "Title is required",
        success: false,
      });
    }

    const newBlog = new blogModel({
      userId,
      title,
      img,
      dsc,
    });

    await newBlog.save();

    res.status(201).send({
      message: "New blog created",
      success: true,
      newBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while creating blog",
      success: false,
      error,
    });
  }
};

// Update Blog Controller
exports.updateBlogController = async (req, res) => {
  try {
    const userId = req.userId;
    const blogId = req.params.id;
    const { title, img, dsc } = req.body;

    const findBlog = await blogModel.findById({ _id: blogId });

    if (!findBlog) {
      return res.status(404).send({
        message: "Blog not found",
        success: false,
      });
    }

    const updateBlog = await blogModel.findByIdAndUpdate(
      { _id: blogId },
      { userId, title, img, dsc },
      { new: true }
    );

    res.status(200).send({
      message: "Blog updated successfully",
      success: true,
      updateBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while updating blog",
      success: false,
      error,
    });
  }
};

// Delete Blog Controller
exports.deleteBlogController = async (req, res) => {
  try {
    const userId = req.userId;
    const blogId = req.params.id;

    const findBlog = await blogModel.findById(blogId);

    if (!findBlog) {
      return res.status(404).send({
        message: "Blog not found",
        success: false,
      });
    }

    if (userId.toString() !== findBlog.userId.toString()) {
      return res.status(403).send({
        message: "Unauthorized user",
        success: false,
      });
    }

    const deleteBlog = await blogModel.findByIdAndDelete(blogId);

    res.status(200).send({
      message: "Blog deleted successfully",
      success: true,
      deleteBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while deleting blog",
      success: false,
      error,
    });
  }
};

// Get All Blogs Controller
exports.getAllBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find();

    if (blogs.length === 0) {
      return res.status(404).send({
        message: "No blogs found",
        success: false,
      });
    }

    res.status(200).send({
      message: "Blogs retrieved successfully",
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while retrieving blogs",
      success: false,
      error,
    });
  }
};

// Get My Blogs Controller
exports.getMyBlogController = async (req, res) => {
  try {
    const userId = req.userId;
    const blogs = await blogModel.find({ userId });

    if (blogs.length === 0) {
      return res.status(404).send({
        message: "No blogs found for this user",
        success: false,
      });
    }

    res.status(200).send({
      message: "Blogs fetched successfully",
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while fetching blogs",
      success: false,
      error,
    });
  }
};
