const express = require("express");
const router = express.Router();

//controllers
const {
  register,
  login,
  updateUser,
  frogetPassword,
  newPassword,
} = require("../controllers/userController");

//middleware
const userAuthMiddleware = require("../middleware/userAuthMiddleware");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/login/frogetpassword").post(frogetPassword);
router.route("/login/newpassword/:id/:token").post(newPassword);
router.route("/updateUser").patch(userAuthMiddleware, updateUser);

module.exports = router;
