const express = require("express");
const applicant_controller = require("../controller/applicantController");
const authMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/signup", applicant_controller.signup);
router.post("/login", applicant_controller.login);
router.get("/logout", applicant_controller.logout);
router.post(
  "/upload",
  upload.single("resume"),
  applicant_controller.fileUpload
);

module.exports = router;