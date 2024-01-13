const User = require("../db/User");
const Recruiter = require("../db/Recruiter");
const JobApplicant = require("../db/JobApplicant");

const getUserProfile = (req, res) => {
  const user = req.user;
    if (user.type === "recruiter") {
      Recruiter.findOne({ userId: user._id })
        .then((recruiter) => {
          if (recruiter == null) {
            res.status(404).json({
              message: "User does not exist",
            });
            return;
          }
          res.json(recruiter);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } else {
      JobApplicant.findOne({ userId: user._id })
        .then((jobApplicant) => {
          if (jobApplicant == null) {
            res.status(404).json({
              message: "User does not exist",
            });
            return;
          }
          res.json(jobApplicant);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    }

    // Logic for GET /user
};

const getUserById = (req, res) => {

  User.findOne({ _id: req.params.id })
      .then((userData) => {
        if (userData === null) {
          res.status(404).json({
            message: "User does not exist",
          });
          return;
        }
  
        if (userData.type === "recruiter") {
          Recruiter.findOne({ userId: userData._id })
            .then((recruiter) => {
              if (recruiter === null) {
                res.status(404).json({
                  message: "User does not exist",
                });
                return;
              }
              res.json(recruiter);
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        } else {
          JobApplicant.findOne({ userId: userData._id })
            .then((jobApplicant) => {
              if (jobApplicant === null) {
                res.status(404).json({
                  message: "User does not exist",
                });
                return;
              }
              res.json(jobApplicant);
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
    // Logic for GET /user/:id
};

const updateUserProfile = (req, res) => {
  const user = req.user;
    const data = req.body;
    if (user.type == "recruiter") {
      Recruiter.findOne({ userId: user._id })
        .then((recruiter) => {
          if (recruiter == null) {
            res.status(404).json({
              message: "User does not exist",
            });
            return;
          }
          if (data.name) {
            recruiter.name = data.name;
          }
          if (data.contactNumber) {
            recruiter.contactNumber = data.contactNumber;
          }
          if (data.bio) {
            recruiter.bio = data.bio;
          }
          recruiter
            .save()
            .then(() => {
              res.json({
                message: "User information updated successfully",
              });
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } else {
      JobApplicant.findOne({ userId: user._id })
        .then((jobApplicant) => {
          if (jobApplicant == null) {
            res.status(404).json({
              message: "User does not exist",
            });
            return;
          }
          if (data.name) {
            jobApplicant.name = data.name;
          }
          if (data.education) {
            jobApplicant.education = data.education;
          }
          if (data.skills) {
            jobApplicant.skills = data.skills;
          }
          if (data.resume) {
            jobApplicant.resume = data.resume;
          }
          if (data.profile) {
            jobApplicant.profile = data.profile;
          }
          console.log(jobApplicant);
          jobApplicant
            .save()
            .then(() => {
              res.json({
                message: "User information updated successfully",
              });
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    }

    // Logic for PUT /user
};

module.exports = {
    getUserProfile,
    getUserById,
    updateUserProfile
};
