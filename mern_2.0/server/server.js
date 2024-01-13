const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");
const fs = require("fs");

require("dotenv").config()

// MongoDB connection
const db = require('./config/keys').mongoURI;
mongoose
  .connect( db,{ useNewUrlParser: true ,useUnifiedTopology: true,})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
const port = process.env.PORT || 8000;

// Body parser middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
app.use("/auth", require("./routes/authRoutes"));
// app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

// New route files
app.use(require("./routes/jobRoutes"));
app.use(require("./routes/applicationRoutes"));
app.use(require("./routes/userRoutes"));
app.use(require("./routes/applicantRoutes"));
app.use(require("./routes/ratingRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
