const JobApplication = require("../models/jobApplication");

const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applicantId = req.user._id; // Get the ID of the logged-in applicant

    // Check if the applicant has already applied for this job
    const existingApplication = await JobApplication.findOne({
      jobId,
      applicantId,
    });

    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job." });
    }

    // Create a new job application
    const jobApplication = new JobApplication({
      jobId,
      applicantId,
      // You can add more fields here if needed, like cover letter, application status, etc.
    });

    await jobApplication.save();

    res.status(201).json({ message: "Job application submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred during job application" });
  }
};

// Add more functions for retrieving applications, updating application status, etc.

module.exports = {
  applyForJob,
};
