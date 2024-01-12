import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function JobPosting() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    category: "",
    description: "",
    requirements: "",
    salary: "",
    keywords: [],
  });
  const [authError, setAuthError] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve organization token from local storage
      const orgToken = JSON.parse(localStorage.getItem("orgToken"));

      // Include the organization token in the request headers
      const response = await axios.post("http://localhost:8000/job/post", formData, {
        headers: {
          Authorization: `Bearer ${orgToken}`,
        },
      });

      if (response.status === 201) {
        // Show success popup
        setSuccessPopup(true);
        // Optionally, you can redirect to another page or handle it differently
      } else {
        console.log("Job posting failed!");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle authentication error
        setAuthError(true);
        // Redirect to login or handle unauthorized access
        navigate('/organization/login');
      } else {
        console.error("Error during job posting:", error);
      }
    }
  };

  const closePopup = () => {
    setSuccessPopup(false);
  };

  return (
    <div style={{ color: "black" }}>
      {authError && <p>Please log in to post a job.</p>}
      {!authError && (
        <div>
          <h2>Post a Job</h2>
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label>Type:</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />

            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />

            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>

            <label>Requirements:</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
            ></textarea>

            <label>Salary:</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />

            <label>Keywords (comma separated):</label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords.join(",")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  keywords: e.target.value.split(","),
                })
              }
            />

            <button type="submit">Post Job</button>
          </form>
        </div>
      )}

      {successPopup && (
        <div>
          <p>Job posted successfully!</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default JobPosting;
