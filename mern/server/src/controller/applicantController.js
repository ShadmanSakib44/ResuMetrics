const bcrypt = require("bcrypt");
const passport = require("passport");
const path = require("path");
const Applicant = require("../models/applicant");
const Resume = require("../models/resume");

const signup = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    console.log(req.body);
    const existingApplicant = await Applicant.findOne({ email });

    if (existingApplicant) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newApplicant = new Applicant({
      name,
      password: hashedPassword,
      email,
    });
    await newApplicant.save();
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: "Error occurred during signup" });
  }
};

const login = (req, res, next) => {
  const strategyName = "applicant";

  passport.authenticate(strategyName, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Error during login 1" });
    }
    if (!user) {
      const errorMessage = info.message;
      console.log(errorMessage);
      return res.status(401).send(errorMessage);
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error during login 2" });
      }

      const newApplicant = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: "applicant", // Include the role
      };
      console.log(newApplicant);

      res.json({ token: newApplicant });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  console.log(req.user);
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Logged out" });
  });
};

const fileUpload = async (req, res) => {
  console.log(req.body.email);
  const email = req.body.email;

  filename = path.basename(req.file.path);
  // console.log(filename);

  try {
    const applicant = await Applicant.findOne({ email });
    console.log(applicant._id.toString());

    const user = applicant._id.toString();

    const resume = new Resume({
      filename: filename,
      applicant: user,
    });

    await resume.save();
    res.status(200).json({ message: "Saved file" });
  } catch (error) {
    console.log(error);
  }
};




module.exports = { signup, login, logout, fileUpload };