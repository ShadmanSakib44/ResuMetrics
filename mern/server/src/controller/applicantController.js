// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "ResuMetrics";

// const signup = async (req, res) => {
//   //   console.log(req.body);
//   const { username, email, password } = req.body;
//   try {
//     const existingApplicant = await Applicant.findOne({ email: email });

//     if (existingApplicant) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const applicant = new Applicant({
//       username: username,
//       password: hashedPassword,
//       email: email,
//     });

//     await applicant.save();

//     const token = jwt.sign(
//       { email: applicant.email, id: applicant._id },
//       SECRET_KEY
//     );

//     res.status(201).json({ user: applicant, token: token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const existingApplicant = await Applicant.findOne({ email: email });

//     if (!existingApplicant) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const matchPassword = await bcrypt.compare(
//       password,
//       existingApplicant.password
//     );

//     if (!matchPassword) {
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }

//     const token = jwt.sign(
//       { email: existingApplicant.email, id: existingApplicant._id },
//       SECRET_KEY
//     );

//     res.status(201).json({ user: existingApplicant, token: token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// module.exports = { signup, login };

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

// const login = (req, res, next) => {
//   passport.authenticate("local", (err, applicant, info) => {
//     if (err) {
//       return res.status(500).json({ message: "Error during login" });
//     }
//     if (!applicant) {
//       return res.status(401).json({ message: info.message });
//     }

//     req.login(applicant, (err) => {
//       if (err) {
//         return res.status(500).json({ message: "Error during login" });
//       }

//       const token = jwt.sign(
//         { username: applicant.username },
//         process.env.JWT_SECRET
//       );
//       res.json({ token });
//     });
//   })(req, res, next);
// };

const login = (req, res, next) => {
  const strategyName = "applicant";

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
