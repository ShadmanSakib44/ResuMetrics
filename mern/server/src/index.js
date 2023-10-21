// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const session = require("express-session");
// const passport = require("./passport"); // Import the configured Passport instance
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");
// require("dotenv").config();

// require("dotenv").config();
// const express = require("express");
// const app = express();
// const session = require("express-session");
// const passport = require("./config/passport"); // Import the configured Passport instance
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const ejs = require("ejs");
// const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());
// app.set("view engine", "ejs");

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log("Connected to Database successfully!");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const applicantRouter = require("./routes/applicantRoutes");
// app.use("/users", applicantRouter);

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const expressSession = require("express-session");
const passport = require("passport");
const applicantRoutes = require("./routes/applicantRoutes");
const authMiddleware = require("./middlewares/auth");

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
