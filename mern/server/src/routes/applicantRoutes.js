// const express = require("express");
// const { signup, login } = require("../controller/applicantController");
// const userRouter = express.Router();

// userRouter.use(express.json());

// userRouter.post("/signup", signup);

// userRouter.post("/login", login);

// module.exports = userRouter;

const express = require("express");
const applicant_controller = require("../controller/applicantController");
const authMiddleware = require("../middlewares/auth");
const passport = require("passport");

const router = express.Router();

router.post("/signup", applicant_controller.signup);
router.post(
  "/login",
  passport.authenticate("applicant"),
  applicant_controller.login
);
router.get("/logout", authMiddleware, applicant_controller.logout);

module.exports = router;
