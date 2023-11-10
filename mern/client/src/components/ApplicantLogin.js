import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ApplicantLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    // Redirect to the "applicant/signup" page
    navigate('/applicant/signup');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/applicant/login",
        formData
      );
      if (response.data.token) {
        localStorage.setItem(
          "applicant_token",
          JSON.stringify(response.data.token)
        );
        console.log("Login successful!");
        window.location = "/applicant/profile";
      } else {
        console.log("Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
      width: "100%",
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
    button1: {
      padding: "10px 20px",
      background: "linear-gradient(90deg, #55555b, #2d2d34)",
      color: "#fff",
      borderRadius: "5px",
      border: "2px solid #fff",
      cursor: "pointer",
      marginTop: "20px",
    },
    button2: {
      padding: "10px 20px",
      background: "linear-gradient(90deg, #55555b, #2d2d34)",
      color: "#fff",
      borderRadius: "5px",
      border: "2px solid #fff",
      cursor: "pointer",
      marginTop: "30px", // Adjust the marginTop value for space between buttons
    },
    h2: {
      color: "white",
      fontWeight: "bold"
    },
  };
  

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>Applicant Login</h2>
      <form onSubmit={handleSubmit}>
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
<button style={{ ...styles.button1, marginRight: '170px' }} type="submit">
  Login
</button>
<button style={styles.button2} type="submit" onClick={handleSignUpClick}>
      Sign Up
    </button>
      </form>
    </div>
  );
}

export default ApplicantLogin;
