const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Applicant = require("../models/Applicant");

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

    const token = jwt.sign(
      { email: newApplicant.email },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error occurred during signup" });
  }
};

const login = (req, res, next) => {
  const strategyName = "applicant";

  passport.authenticate(strategyName, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Error during login" });
    }
    if (!user) {
      const errorMessage = info.message;
      console.log(errorMessage);
      return res.status(404).send(errorMessage);
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error during login" });
      }

      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET
      );
      res.json({ token });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Logged out" });
  });
  // res.json({ message: "Logged out" });
};

module.exports = { signup, login, logout };
