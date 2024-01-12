// jobController.js
const Job = require("../models/job");
const JobApplication = require("../models/jobApplication");


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

const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Find all job applications for the given job ID
    const applications = await JobApplication.find({ jobId });

    // You can send the list of applications as a response
    res.status(200).json({ applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while retrieving job applications" });
  }
};


const getAllJobs = async (req, res) => {
  try {
    // Fetch all jobs from the database
    const jobs = await Job.find();

    // Send the list of jobs as a response
    res.status(200).json({ jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while retrieving all jobs" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Ensure jobId is present in the request parameters
    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required for deletion" });
    }

    // Find the job by ID
    const job = await Job.findById(jobId);

    // Check if the job exists
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the organization ID in the job matches the logged-in organization ID
    // You need to replace 'req.user._id' with the actual way you get the organization ID from the token
    if (job.companyID.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this job" });
    }

    // Delete the job
    await job.remove();

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while deleting the job" });
  }
};



module.exports = {
  postJob,
  getJobApplications,
  getAllJobs,
  deleteJob,
};