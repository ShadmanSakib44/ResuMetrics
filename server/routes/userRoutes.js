const express = require('express');
const jwtAuth = require('../lib/jwtAuth');
const userController = require('../controllers/userController');

const router = express.Router();

router.get("/user", jwtAuth, userController.getUserProfile);
router.get("/user/:id", jwtAuth, userController.getUserById);
router.put("/user", jwtAuth, userController.updateUserProfile);

module.exports = router;
