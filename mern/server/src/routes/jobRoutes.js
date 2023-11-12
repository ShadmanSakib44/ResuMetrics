const express = require("express");
const jobController = require("../controller/jobController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/post", jobController.postJob);

module.exports = router;
