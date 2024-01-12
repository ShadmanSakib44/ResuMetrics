// AllJobs.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all jobs when the component mounts
    getAllJobs();
  }, []);

  const getAllJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/job/all");
      setJobs(response.data.jobs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      // Assuming you have the organization token stored in local storage
      const orgToken = JSON.parse(localStorage.getItem("orgToken"));

      // Make a request to delete the job with the given jobId
      const response = await axios.post(
        `http://localhost:8000/job/${jobId}/delete`,
        null, // Since it's a POST request, you can pass an empty body
        {
          headers: {
            Authorization: `Bearer ${orgToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Job deleted successfully, you may want to refresh the job list
        getAllJobs();
      } else {
        console.log("Job deletion failed!");
      }
    } catch (error) {
      console.error("Error during job deletion:", error);
    }
  };

  return (
    <div>
      <h2 style={{ color: "white" }}>All Jobs</h2>
      {loading ? (
        <p style={{ color: "white" }}>Loading jobs...</p>
      ) : (
        <div>
          {jobs.map((job) => (
            <div key={job._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
              <h3 style={{ color: "white" }}>{job.title}</h3>
              <p style={{ color: "white" }}>{job.company}</p>
              <p style={{ color: "white" }}>{job.description}</p>
              <p style={{ color: "white" }}>Type: {job.type}</p>
              <p style={{ color: "white" }}>Category: {job.category}</p>
              <p style={{ color: "white" }}>Requirements: {job.requirements}</p>
              <p style={{ color: "white" }}>Salary: {job.salary}</p>
              <p style={{ color: "white" }}>Keywords: {job.keywords.join(", ")}</p>
              <button onClick={() => handleDelete(job._id)} style={{ color: "white" }}>
                Delete Job
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;
