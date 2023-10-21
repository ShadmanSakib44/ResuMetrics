const express = require("express");
const applicant_controller = require("../controller/applicantController");
const authMiddleware = require("../middlewares/auth");
const passport = require("passport");

const router = express.Router();

router.post("/signup", applicant_controller.signup);
router.post("/login", applicant_controller.login);
router.get("/logout", authMiddleware, applicant_controller.logout);

module.exports = router;
