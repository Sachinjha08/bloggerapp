const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(404).send({
        message: "user not found",
        success: false,
      });
    }
    const decoded = await jwt.decode(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      res.status(404).send({
        message: "unauthorized user",
        success: flase,
      });
    }
    req.userId = user._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error on tokens",
      success: false,
      error,
    });
  }
};
module.exports = verifyToken;
