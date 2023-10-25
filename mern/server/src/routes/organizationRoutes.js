const express = require("express");
const organizationController = require("../controller/organizationController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// userRouter.post("/signup", (req, res) => {
//   res.send("Signup");
// });

// userRouter.post("/login", (req, res) => {
//   res.send("login");
// });

router.post("/signup", organizationController.signup);
router.post("/login", organizationController.login);
router.get("/logout", organizationController.logout);

module.exports = router;
