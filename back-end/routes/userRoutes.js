const express = require("express");
const router = express.Router();

//controllers
const {
  register,
  login,
  updateUser,
} = require("../controllers/userController");

//middleware
const userAuthMiddleware = require("../middleware/userAuthMiddleware");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(userAuthMiddleware, updateUser);

module.exports = router;
