const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  companyID: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  keywords: {
    type: [String],
    default: [],
  },
});

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;