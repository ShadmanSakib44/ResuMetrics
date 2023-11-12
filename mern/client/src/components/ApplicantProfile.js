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
      background: "#111111",
    },
    text: {
      color: "#fff",
      margin: "10px 0",
    },
    button2: {
      padding: "10px 20px",
      background: "linear-gradient(90deg, #55555b, #2d2d34)",
      color: "#fff",
      borderRadius: "5px",
      border: "2px solid #fff",
      cursor: "pointer",
      marginTop: "20px",
    },
  };

  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    const token = localStorage.getItem("applicant_token");

    if (token) {
      const object = JSON.parse(token);
      console.log(object.name);
      console.log(object.email);

      setUserData({
        name: object.name,
        email: object.email,
      });
    }
  }, []);

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
        <h2 style={styles.text}>Applicant Information</h2>
      </div>
      <div>
        <p style={styles.text}>Name: {userData.name}</p>
        <p style={styles.text}>Email: {userData.email}</p>
      </div>
      <div>
        <form onSubmit={handleSubmit1}>
          <button style={styles.button2} type="submit">
            Logout
          </button>
        </form>
      </div>
      <div>
        <form encType="multipart/form-data" onSubmit={handleSubmit2}>
          <input type="file" name="resume" onChange={handleFileChange} />
          <button style={styles.button2} type="submit">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplicantProfile;
