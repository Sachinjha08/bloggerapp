const express = require("express");
const {
  registerController,
  loginController,
  getAllUsersController,
  logoutController,
} = require("../controllers/userControllers");
const router = express.Router();

//POST || register
router.post("/register", registerController);
//POST || login
router.post("/login", loginController);
//POST || logout
router.post("/logout", logoutController);
// router.get("/get-all-users", getAllUsersController);

module.exports = router;
