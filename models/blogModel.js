const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    dsc: {
      type: String,
    },
  },
  { timestamps: true }
);
const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;
