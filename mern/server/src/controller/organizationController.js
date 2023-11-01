const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Organization = require("../models/Organization");

const signup = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    console.log(req.body);
    const existingOrganization = await Organization.findOne({ email });

    if (existingOrganization) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newOrganization = new Organization({
      name,
      password: hashedPassword,
      email,
      verified: true,
    });
    await newOrganization.save();

    res.status(200);
  } catch (error) {
    res.status(500).json({ message: "Error occurred during signup" });
  }
};

const login = (req, res, next) => {
  const strategyName = "organization";

  passport.authenticate(strategyName, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Error during login" });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error during login" });
      }

      const newOrganization = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: "organization", // Include the role
      };

      res.json({ token: newOrganization });
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

module.exports = {
  signup,
  login,
  logout,
};
