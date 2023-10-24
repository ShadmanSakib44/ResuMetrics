import React, { useState } from "react";
import axios from "axios";

function ApplicantSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/applicant/signup",
        formData
      );
      console.log(response.data);
      window.location = "/applicant/login";
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

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
      background: "#111111"
    },
    input: {
      margin: "10px 0",
      padding: "10px 15px",
      borderRadius: "5px",
      width: "90%",
    },
    button: {
      padding: "10px 20px",
      background: "#333333",
      color: "#fff",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      marginTop: "20px",
    },
    h2: {
      color: "white",
      fontWeight: "bold"
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>Applicant Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button style={styles.button} type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default ApplicantSignup;
