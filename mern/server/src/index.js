const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const expressSession = require("express-session");
const passport = require("passport");
const applicantRoutes = require("./routes/applicantRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const jobRoutes = require("./routes/jobRoutes");

// Load environment variables from .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((error) => {
    console.log(error);
  });

// Passport configuration
require("./config/passport");

// Routes
app.use("/applicant", applicantRoutes);
app.use("/organization", organizationRoutes);
app.use("/job", jobRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
