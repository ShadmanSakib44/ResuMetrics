const express = require("express");
const organizationRouter = express.Router();

userRouter.post("/signup", (req, res) => {
  res.send("Signup");
});

userRouter.post("/login", (req, res) => {
  res.send("login");
});

module.exports = organizationRouter;
