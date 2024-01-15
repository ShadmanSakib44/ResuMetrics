const Job = require("../db/Job");
const Application = require("../db/Application");
const mongoose = require("mongoose");

const applyForJob = (req, res) => {
    const user = req.user;
    if (user.type !== "applicant") {
        return res.status(401).json({
            message: "You don't have permissions to apply for a job",
        });
    }

    const data = req.body;
    const jobId = req.params.id;
    Application.findOne({
      userId: user._id,
      jobId: jobId,
      status: {
        $nin: ["deleted", "accepted", "cancelled"],
      },
    })
      .then((appliedApplication) => {
        console.log(appliedApplication);
        if (appliedApplication !== null) {
          res.status(400).json({
            message: "You have already applied for this job",
          });
          return;
        }
  
        Job.findOne({ _id: jobId })
          .then((job) => {
            if (job === null) {
              res.status(404).json({
                message: "Job does not exist",
              });
              return;
            }
            Application.countDocuments({
              jobId: jobId,
              status: {
                $nin: ["rejected", "deleted", "cancelled", "finished"],
              },
            })
              .then((activeApplicationCount) => {
                if (activeApplicationCount < job.maxApplicants) {
                  Application.countDocuments({
                    userId: user._id,
                    status: {
                      $nin: ["rejected", "deleted", "cancelled", "finished"],
                    },
                  })
                    .then((myActiveApplicationCount) => {
                      if (myActiveApplicationCount < 10) {
                        Application.countDocuments({
                          userId: user._id,
                          status: "accepted",
                        }).then((acceptedJobs) => {
                          if (acceptedJobs === 0) {
                            const application = new Application({
                              userId: user._id,
                              recruiterId: job.userId,
                              jobId: job._id,
                              status: "applied",
                              sop: data.sop,
                            });
                            application
                              .save()
                              .then(() => {
                                res.json({
                                  message: "Job application successful",
                                });
                              })
                              .catch((err) => {
                                res.status(400).json(err);
                              });
                          } else {
                            res.status(400).json({
                              message:
                                "You already have an accepted job. Hence you cannot apply.",
                            });
                          }
                        });
                      } else {
                        res.status(400).json({
                          message:
                            "You have 10 active applications. Hence you cannot apply.",
                        });
                      }
                    })
                    .catch((err) => {
                      res.status(400).json(err);
                    });
                } else {
                  res.status(400).json({
                    message: "Application limit reached",
                  });
                }
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        res.json(400).json(err);
      });


    // rest of the logic for applying to a job...
    // This includes checking if already applied, job existence, active applications, etc.
};

const getApplicationsForJob = (req, res) => {
    const user = req.user;
    if (user.type !== "recruiter") {
        return res.status(401).json({
            message: "You don't have permissions to view job applications",
        });
    }

    const jobId = req.params.id;
    let findParams = { jobId: jobId, recruiterId: user._id };
    let sortParams = {};

    // Additional logic if any filters or sorting parameters are provided in req.query

    Application.find(findParams)
        .collation({ locale: "en" })
        .sort(sortParams)
        .then(applications => res.json(applications))
        .catch(err => res.status(400).json(err));
};

const getAllApplications = (req, res) => {
    const user = req.user;
    
    // Logic for getting all applications for the user, whether recruiter or applicant
    Application.aggregate([
      {
        $lookup: {
          from: "jobapplicantinfos",
          localField: "userId",
          foreignField: "userId",
          as: "jobApplicant",
        },
      },
      { $unwind: "$jobApplicant" },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "job",
        },
      },
      { $unwind: "$job" },
      {
        $lookup: {
          from: "recruiterinfos",
          localField: "recruiterId",
          foreignField: "userId",
          as: "recruiter",
        },
      },
      { $unwind: "$recruiter" },
      {
        $match: {
          [user.type === "recruiter" ? "recruiterId" : "userId"]: user._id,
        },
      },
      {
        $sort: {
          dateOfApplication: -1,
        },
      },
    ])
      .then((applications) => {
        res.json(applications);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
};

const updateApplicationStatus = (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const status = req.body.status;
    if (user.type === "recruiter") {
      if (status === "accepted") {
        // get job id from application
        // get job info for maxPositions count
        // count applications that are already accepted
        // compare and if condition is satisfied, then save
  
        Application.findOne({
          _id: id,
          recruiterId: user._id,
        })
          .then((application) => {
            if (application === null) {
              res.status(404).json({
                message: "Application not found",
              });
              return;
            }
  
            Job.findOne({
              _id: application.jobId,
              userId: user._id,
            }).then((job) => {
              if (job === null) {
                res.status(404).json({
                  message: "Job does not exist",
                });
                return;
              }
  
              Application.countDocuments({
                recruiterId: user._id,
                jobId: job._id,
                status: "accepted",
              }).then((activeApplicationCount) => {
                if (activeApplicationCount < job.maxPositions) {
                  // accepted
                  application.status = status;
                  application.dateOfJoining = req.body.dateOfJoining;
                  application
                    .save()
                    .then(() => {
                      Application.updateMany(
                        {
                          _id: {
                            $ne: application._id,
                          },
                          userId: application.userId,
                          status: {
                            $nin: [
                              "rejected",
                              "deleted",
                              "cancelled",
                              "accepted",
                              "finished",
                            ],
                          },
                        },
                        {
                          $set: {
                            status: "cancelled",
                          },
                        },
                        { multi: true }
                      )
                        .then(() => {
                          if (status === "accepted") {
                            Job.findOneAndUpdate(
                              {
                                _id: job._id,
                                userId: user._id,
                              },
                              {
                                $set: {
                                  acceptedCandidates: activeApplicationCount + 1,
                                },
                              }
                            )
                              .then(() => {
                                res.json({
                                  message: `Application ${status} successfully`,
                                });
                              })
                              .catch((err) => {
                                res.status(400).json(err);
                              });
                          } else {
                            res.json({
                              message: `Application ${status} successfully`,
                            });
                          }
                        })
                        .catch((err) => {
                          res.status(400).json(err);
                        });
                    })
                    .catch((err) => {
                      res.status(400).json(err);
                    });
                } else {
                  res.status(400).json({
                    message: "All positions for this job are already filled",
                  });
                }
              });
            });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        Application.findOneAndUpdate(
          {
            _id: id,
            recruiterId: user._id,
            status: {
              $nin: ["rejected", "deleted", "cancelled"],
            },
          },
          {
            $set: {
              status: status,
            },
          }
        )
          .then((application) => {
            if (application === null) {
              res.status(400).json({
                message: "Application status cannot be updated",
              });
              return;
            }
            if (status === "finished") {
              res.json({
                message: `Job ${status} successfully`,
              });
            } else {
              res.json({
                message: `Application ${status} successfully`,
              });
            }
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      }
    } else {
      if (status === "cancelled") {
        console.log(id);
        console.log(user._id);
        Application.findOneAndUpdate(
          {
            _id: id,
            userId: user._id,
          },
          {
            $set: {
              status: status,
            },
          }
        )
          .then((tmp) => {
            console.log(tmp);
            res.json({
              message: `Application ${status} successfully`,
            });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        res.status(401).json({
          message: "You don't have permissions to update job status",
        });
      }
    }

    // Logic for updating the status of an application...

};


const sendEmailToApplicant = (applicantEmail, applicationStatus) => {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL_USER, // Use environment variables
          pass: process.env.EMAIL_PASSWORD, // Use environment variables
      },
  });

  const mailOptions = {
      from: process.env.EMAIL_USER,
      to: applicantEmail,
      subject: `Application Status Update - ${applicationStatus}`,
      text: `Dear Applicant,\n\nYour application status has been updated to ${applicationStatus}.\n\nBest regards,\nYour Company`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
};




module.exports = {
    applyForJob,
    getApplicationsForJob,
    getAllApplications,
    updateApplicationStatus
};
