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

passport.use(
  "organization",
  new LocalStrategy(
    { usernameField: "email" }, // Use "email" as the username field
    async (email, password, done) => {
      try {
        const organization = await Organization.findOne({ email });

        if (!organization) {
          return done(null, false, { message: "Email not found." });
        }

        if (!organization.verified) {
          return done(null, false, { message: "Organization not verified." });
        }

        const passwordMatch = await bcrypt.compare(
          password,
          organization.password
        );

        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, organization);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  const userRole = user instanceof Applicant ? "applicant" : "organization";
  done(null, { id: user._id, role: userRole });
});

passport.deserializeUser((serializedUser, done) => {
  const { id, role } = serializedUser;

  if (role === "applicant") {
    Applicant.findById(id)
      .then((applicant) => {
        if (applicant) {
          const newApplicant = {
            _id: applicant._id,
            name: applicant.name,
            email: applicant.email,
            role: role, // Include the role
          };
          return done(null, newApplicant);
        } else {
          return done(new Error("User not found"), null);
        }
      })
      .catch((err) => {
        done(err, null);
      });
  } else if (role === "organization") {
    Organization.findById(id)
      .then((organization) => {
        if (organization) {
          const newOrganization = {
            _id: organization._id,
            name: organization.name,
            email: organization.email,
            role: role, // Include the role
          };
          return done(null, newOrganization);
        } else {
          return done(new Error("User not found"), null);
        }
      })
      .catch((err) => {
        done(err, null);
      });
  }
});

module.exports = passport;
