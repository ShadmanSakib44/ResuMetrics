import axios from "axios";
import React, { useEffect, useState } from "react";

function ApplicantProfile() {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      border: "1px solid #e5e5e5",
      borderRadius: "5px",
      boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      margin: "50px auto",
    },
    input: {
      margin: "10px 0",
      padding: "10px 15px",
      borderRadius: "5px",
      width: "90%",
    },
    button: {
      padding: "10px 20px",
      background: "#007BFF",
      color: "#fff",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      marginTop: "20px",
    },
    h2: {
      color: "white",
    },
  };

  useEffect(() => {
    const token = localStorage.getItem("applicant_token");
    const object = JSON.parse(token);
    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("email");

    nameElement.textContent = object.name;
    emailElement.textContent = object.email;
  });

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8000/applicant/logout"
      );
      if (response.status === 200) {
        localStorage.clear();
        window.location = "/applicant/login";
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    const email = document.getElementById("email").textContent;
    formData.append("email", email);

    try {
      const response = await axios.post(
        "http://localhost:8000/applicant/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response as needed
      console.log("Upload success:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Upload error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div>
        <h2 style={styles.h2}>Applicant Information</h2>
      </div>
      <div>
        <p style={styles.h2}>
          Name: <span id="name"></span>
        </p>
      </div>
      <div>
        <p style={styles.h2}>
          Email: <span id="email"></span>
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit1}>
          <button style={styles.button} type="submit">
            Logout
          </button>
        </form>
      </div>
      <div>
        <form encType="multipart/form-data" onSubmit={handleSubmit2}>
          <input type="file" name="resume" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default ApplicantProfile;
