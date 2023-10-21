const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Applicant = mongoose.model("Applicant", ApplicantSchema);
module.exports = Applicant;
