const express = require("express");
const jwtAuth = require("../lib/jwtAuth");
const applicantController = require("../controllers/applicantController");

const router = express.Router();

router.get("/applicants", jwtAuth, applicantController.getApplicants);

module.exports = router;
