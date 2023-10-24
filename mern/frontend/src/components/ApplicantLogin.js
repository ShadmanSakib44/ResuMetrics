import React, { useState } from 'react';
import axios from 'axios';

function ApplicantLogin() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/applicant', formData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                console.log("Login successful!");
            } else {
                console.log("Login failed!");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    }

    const styles = {
        body: {
            background:'#0B0B0C'
        },
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
            background: '#111111',
            text:'white'
        },
        input: {
            margin: '10px 0',
            padding: '10px 15px',
            borderRadius: '5px',
            width: '90%'
        },
        button: {
            padding: '10px 20px',
            background: '#555555',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '20px'
        }
    }

    return (
        <div style={styles.container}>
            <h2 style={{ color: '#fff', fontWeight: 'bold' }}>Applicant Login</h2>
            <form onSubmit={handleSubmit}>
                <input style={styles.input} type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input style={styles.input} type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button style={styles.button} type="submit">Login</button>
            </form>
        </div>
    );
}

export default ApplicantLogin;
