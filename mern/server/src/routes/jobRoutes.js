const express = require("express");
const jobController = require("../controller/jobController");
const jobApplicationController = require("../controller/jobApplicationController");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/post",jobController.postJob);
router.post("/:jobId/apply", authMiddleware, jobApplicationController.applyForJob);

router.get("/:jobId/applications", authMiddleware, jobController.getJobApplications);


module.exports = router;