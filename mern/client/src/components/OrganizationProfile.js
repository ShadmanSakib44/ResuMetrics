import axios from "axios";
import React, { useEffect, useState } from "react";

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
    const token = localStorage.getItem("orgToken");

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
      <h2 style={{ color: "#fff", fontWeight: "bold" }}>
        Organization Information
      </h2>
      <div>
        <p style={styles.text}>Name: {userData.name}</p>
        <p style={styles.text}>Email: {userData.email}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <button style={styles.button2} type="submit" onClick={handleSubmit}>
          Logout
        </button>
      </form>
    </div>
  );
}

export default OrganizationProfile;
