import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ApplicantSignup from './components/ApplicantSignup';
import ApplicantLogin from './components/ApplicantLogin';
import OrganizationSignup from './components/OrganizationSignup';
import OrganizationLogin from './components/OrganizationLogin';

function App() {
    const [isApplicantDropdownOpen, setApplicantDropdownOpen] = useState(false);
    const [isOrganizationDropdownOpen, setOrganizationDropdownOpen] = useState(false);

    return (
        <Router>
            <div style={styles.app}>
                <nav style={styles.nav}>
                    <ul style={styles.ul}>
                        <li style={styles.li} onMouseEnter={() => setApplicantDropdownOpen(true)} onMouseLeave={() => setApplicantDropdownOpen(false)}>
                            <span style={styles.dropdownTrigger}>Applicant</span>
                            {isApplicantDropdownOpen && (
                                <div style={styles.dropdown}>
                                    <Link to="/applicant/signup" style={styles.link}>Signup</Link>
                                    <Link to="/applicant/login" style={styles.link}>Login</Link>
                                </div>
                            )}
                        </li>
                        <li style={styles.li} onMouseEnter={() => setOrganizationDropdownOpen(true)} onMouseLeave={() => setOrganizationDropdownOpen(false)}>
                            <span style={styles.dropdownTrigger}>Organization</span>
                            {isOrganizationDropdownOpen && (
                                <div style={styles.dropdown}>
                                    <Link to="/organization/signup" style={styles.link}>Signup</Link>
                                    <Link to="/organization/login" style={styles.link}>Login</Link>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/applicant/signup" element={<ApplicantSignup />} />
                    <Route path="/applicant/login" element={<ApplicantLogin />} />
                    <Route path="/organization/signup" element={<OrganizationSignup />} />
                    <Route path="/organization/login" element={<OrganizationLogin />} />
                </Routes>
            </div>
        </Router>
    );
}

const styles = {
    app: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '960px',
        margin: '0 auto',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px'
    },
    nav: {
        backgroundColor: '#f5f5f5',
        padding: '10px 0',
        borderRadius: '5px',
        marginBottom: '20px'
    },
    ul: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'space-around'
    },
    li: {
        position: 'relative',
        display: 'inline'
    },
    link: {
        textDecoration: 'none',
        color: '#333',
        padding: '10px 15px',
        borderRadius: '4px',
        display: 'block',
        transition: 'background-color 0.2s'
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: '#f5f5f5',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        zIndex: 1,
        display: 'block',
        marginTop: '5px'
    },
    dropdownTrigger: {
        cursor: 'pointer'
    }
};

export default App;
