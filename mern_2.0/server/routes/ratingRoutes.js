const express = require('express');
const jwtAuth = require('../lib/jwtAuth');
const ratingController = require('../controllers/ratingsController');

const router = express.Router();

router.put("/rating", jwtAuth, ratingController.updateRating);
router.get("/rating", jwtAuth, ratingController.getPersonalRating);

module.exports = router;
