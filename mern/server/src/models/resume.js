const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  applicant: {
    type: String,
    required: true,
  },
});

const Resume = mongoose.model("Resume", ResumeSchema);
module.exports = Resume;
