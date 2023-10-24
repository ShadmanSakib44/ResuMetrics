import React, { useState } from 'react';
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';

function OrganizationSignup() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [emailValid, setEmailValid] = useState(true);

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
            const response = await axios.post('http://localhost:8000/organization/signup', formData);
            console.log(response.data);
        } catch (error) {
            console.error("Error during signup:", error);
        }
    }

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
            width: '90%'
        },
        button: {
            padding: '10px 20px',
            background: '#333333',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '20px'
        },
        error: {
            color: 'red',
            fontSize: '12px',
            margin: '5px 0'
        }
    }

    return (
        <div style={styles.container}>
            <h2 style={{ color: '#fff', fontWeight: 'bold' }}>Organization Signup</h2>
            <form onSubmit={handleSubmit}>
                <input style={styles.input} type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input style={styles.input} type="email" name="email" placeholder="Email" onChange={handleChange} required />
                {!emailValid && <p style={styles.error}>Invalid email format</p>}
                <input style={styles.input} type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <PasswordStrengthBar password={formData.password} />
                <button style={styles.button} type="submit">Signup</button>
            </form>
        </div>
    );
}

export default OrganizationSignup;