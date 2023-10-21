const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Applicant = require("../models/Applicant");
const Organization = require("../models/Organization");

passport.use(
  "applicant",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const applicant = await Applicant.findOne({ email });

        if (!applicant) {
          return done(null, false, { message: "Email not found." });
        }

        const passwordMatch = await bcrypt.compare(
          password,
          applicant.password
        );

        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, applicant);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Applicant.findById(id)
    .then((applicant) => {
      if (applicant) {
        return done(null, applicant);
      }

      Organization.findById(id)
        .then((organization) => {
          if (organization) {
            return done(null, organization);
          } else {
            // Handle the situation when neither Applicant nor Organization is found
            return done(new Error("User not found"), null);
          }
        })
        .catch((err) => {
          done(err, null);
        });
    })
    .catch((err) => {
      done(err, null);
    });
});

module.exports = passport;
