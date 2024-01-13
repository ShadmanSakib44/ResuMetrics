const express = require("express");
const jwtAuth = require("../lib/jwtAuth");
const applicationsController = require("../controllers/applicationsController");

const router = express.Router();

router.post("/jobs/:id/applications", jwtAuth, applicationsController.applyForJob);
router.get("/jobs/:id/applications", jwtAuth, applicationsController.getApplicationsForJob);
router.get("/applications", jwtAuth, applicationsController.getAllApplications);
router.put("/applications/:id", jwtAuth, applicationsController.updateApplicationStatus);

module.exports = router;
