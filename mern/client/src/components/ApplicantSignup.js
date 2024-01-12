import React, { useState } from 'react';
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useNavigate } from 'react-router-dom';

function ApplicantSignup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [emailValid, setEmailValid] = useState(true);

    const navigate = useNavigate();

    const handleSignInClick = () => {
      // Redirect to the "applicant/login" page
      navigate('/applicant/login');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name === 'email') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            setEmailValid(emailRegex.test(e.target.value));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailValid) {
            console.error("Invalid email format");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/applicant/signup', formData);
            console.log(response.data);
            if (response.data.token) {
                console.log("Signup successful!");
                window.location = "/applicant/login";
            } else {
                console.log("Signup failed!");
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            border: '1px solid #e5e5e5',
            borderRadius: '5px',
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            margin: '50px auto',
            background: '#111111'
        },
        input: {
            margin: '10px 0',
            padding: '10px 15px',
            borderRadius: '5px',
            width: '100%'
        },
        buttonContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          },
          button1: {
            padding: "10px 20px",
            background: "linear-gradient(90deg, #55555b, #2d2d34)",
            color: "#fff",
            borderRadius: "5px",
            border: "2px solid #fff",
            cursor: "pointer",
            marginBottom: "10px",
          },
          h2: {
            color: "white",
            fontWeight: "bold"
          },
          link: {
            color: "#fff",
            textDecoration: "underline",
            cursor: "pointer",
            marginTop: "10px",
            display: "inline-block",
          },
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.h2}>Applicant Signup</h2>
            <form onSubmit={handleSubmit}>
                <input style={styles.input} type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input style={styles.input} type="email" name="email" placeholder="Email" onChange={handleChange} required />
                {!emailValid && <p style={{ color: 'red' }}>Invalid email format</p>}
                <input style={styles.input} type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <PasswordStrengthBar password={formData.password} />
                <div style={styles.buttonContainer}>
        <button style={styles.button1} type="submit">
          Login
        </button>
        <span style={{ ...styles.link, textDecoration: "none" }}>
          Already have an account? <span style={{ textDecoration: "underline" }}  onClick={handleSignInClick}>Sign in</span>
        </span>
        </div>
            </form>
        </div>
    );
}

export default ApplicantSignup;
