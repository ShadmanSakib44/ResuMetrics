const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/resume/:file", (req, res) => {
  res.sendFile(`${req.params.file}`);
});

router.get("/profile/:file", (req, res) => {
  res.sendFile(`${req.params.file}`);
});

module.exports = router;
