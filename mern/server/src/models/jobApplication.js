const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema({
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Applicant",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
 
});

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);
module.exports = JobApplication;
