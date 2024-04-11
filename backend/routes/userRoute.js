const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(logoutUser);

module.exports = userRouter;
