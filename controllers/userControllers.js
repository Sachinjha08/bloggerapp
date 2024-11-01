const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      res.status(400).send({
        message: "require all fields",
        success: false,
      });
    }
    const isExisting = await userModel.findOne({ email });
    if (isExisting) {
      res.status(402).send({
        message: "user already existing",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      userName,
      email,
      password: hashedPassword,
    });
    newUser.save();
    res.status(201).send({
      message: "register successful",
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error while register",
      success: false,
      error,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "All fields are required",
        success: false,
      });
    }

    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(401).send({
        message: "Password does not match",
        success: false,
      });
    }

    const token = jwt.sign({ userId: findUser._id }, "process.env.JWT_SECRET", {
      expiresIn: "3d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3 * 24 * 3600 * 1000,
    });
    return res.status(200).send({
      message: "Login successful",
      success: true,
      user: findUser,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error during login",
      success: false,
      error,
    });
  }
};
exports.logoutController = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).send({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error during logout",
      success: false,
      error,
    });
  }
};
// exports.getAllUsersController = async (req, res) => {
//   try {
//     const users = await userModel.find({}, { password: 0 }); // Exclude the password field
//     if (users.length === 0) {
//       return res.status(404).send({
//         message: "No users found",
//         success: false,
//       });
//     }
//     return res.status(200).send({
//       message: "Users retrieved successfully",
//       success: true,
//       users,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       message: "Error while retrieving users",
//       success: false,
//       error,
//     });
//   }
// };
