import axios from "axios";
import React, { useEffect } from "react";

function OrganizationProfile() {
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
    const token = localStorage.getItem("orgToken");
    const object = JSON.parse(token);
    console.log(object.name);
    console.log(object.email);
    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("email");

    nameElement.textContent = object.name;
    emailElement.textContent = object.email;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8000/organization/logout"
      );
      if (response.status === 200) {
        localStorage.clear();
        window.location = "/organization/login";
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div>
        <h2 style={styles.h2}>Organization Information</h2>
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
        <form onSubmit={handleSubmit}>
          <button style={styles.button} type="submit">
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrganizationProfile;
