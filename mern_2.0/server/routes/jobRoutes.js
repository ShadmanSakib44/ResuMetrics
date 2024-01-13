const express = require('express');
const jwtAuth = require('../lib/jwtAuth');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.post("/jobs", jwtAuth, jobController.addJob);
router.get("/jobs", jwtAuth, jobController.getAllJobs);
router.get("/jobs/:id", jwtAuth, jobController.getJobById);
router.put("/jobs/:id", jwtAuth, jobController.updateJob);
router.delete("/jobs/:id", jwtAuth, jobController.deleteJob);

module.exports = router;
