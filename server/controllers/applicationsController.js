const Job = require("../db/Job");
const Application = require("../db/Application");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const User = require('../db/User');
const JobApplicant = require('../db/JobApplicant');

require("dotenv").config();

const sendEmail = (recipientEmail, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_MAIL, // Your email
      pass: process.env.USER_PASS, // Your email password
    },
  });

  let mailOptions = {
    from: 'shadmansakib20@iut-dhaka.edu',
    to: recipientEmail,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

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
      res.status(400).json(err);
    });
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
    if (status === "accepted" || status === "shortlisted") {
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
          })
            .then((job) => {
              if (job === null) {
                res.status(404).json({
                  message: "Job does not exist",
                });
                return;
              }

              Application.countDocuments({
                recruiterId: user._id,
                recruiterEmail: user.email,
                jobId: job._id,
                status: "accepted",
              }).then((activeApplicationCount) => {
                if (activeApplicationCount < job.maxPositions) {
                  application.status = status;
                  application.dateOfJoining = req.body.dateOfJoining;

                  User.findById(application.userId)
                    .then((applicantUser) => {
                      if (applicantUser) {
                        const emailSubject =
                          status === "accepted"
                            ? 'Job Application Status'
                        : 'Shortlisted for Job ';

                        const emailBody =
                          status === "accepted"
                            ? 'Your application for the job has been accepted.'
                            : 'You have been shortlisted for the job.';

                        sendEmail(applicantUser.email, emailSubject, emailBody);

                        // ... [existing code above]

                        if (status === "shortlisted") {
                          // Schedule a meeting 5 days later for shortlisted applicants
                          const meetingDate = new Date();
                          meetingDate.setDate(meetingDate.getDate() + 5);

                          // Format meetingDate to a readable format
                          const formattedMeetingDate = meetingDate.toDateString();

                          // Send email to notify applicant about shortlisting
                          User.findById(application.userId)
                            .then((applicantUser) => {
                              if (applicantUser) {
                                const emailSubject = 'Shortlisted for Job';
                                const emailBody = `You have been shortlisted for the job. A meeting is scheduled on ${formattedMeetingDate}. Please prepare accordingly.`;

                                sendEmail(applicantUser.email, emailSubject, emailBody);

                                // Save the meeting date in the application (optional)
                                application.meetingDate = meetingDate;

                                // Save the updated application
                                application
                                  .save()
                                  .then(() =>
                                    res.json({
                                      message: "Shortlisted and meeting scheduled successfully",
                                    })
                                  )
                                  .catch((err) => {
                                    res.status(400).json(err);
                                  });
                              } else {
                                throw new Error('User not found');
                              }
                            })
                            .catch((err) => {
                              console.error('Error fetching user email:', err);
                              // Handle the error appropriately
                            });
                        } else {
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
                                          acceptedCandidates:
                                            activeApplicationCount + 1,
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
                        }
                      } else {
                        throw new Error('User not found');
                      }
                    })
                    .catch((err) => {
                      console.error('Error fetching user email:', err);
                      // Handle the error appropriately
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
};

module.exports = {
  applyForJob,
  getApplicationsForJob,
  getAllApplications,
  updateApplicationStatus
};
