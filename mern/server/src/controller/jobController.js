// jobController.js
const Job = require("../models/job");

const postJob = async (req, res) => {
  try {
    const {
      title,
      type,
      category,
      description,
      requirements,
      salary,
      keywords,
    } = req.body;

    const company = req.user.name;
    const companyID = req.user._id;

    const newJob = new Job({
      title,
      company,
      companyID,
      type,
      category,
      description,
      requirements,
      salary,
      keywords,
    });
    console.log(newJob);

    await newJob.save();

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred during job posting" });
  }
};

module.exports = {
  postJob,
};
