import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ApplicantSignup from './components/ApplicantSignup';
import ApplicantLogin from './components/ApplicantLogin';
import OrganizationSignup from './components/OrganizationSignup';
import OrganizationLogin from './components/OrganizationLogin';
import './App.css'; // Import the CSS file

function App() {
    const [isApplicantDropdownOpen, setApplicantDropdownOpen] = useState(false);
    const [isOrganizationDropdownOpen, setOrganizationDropdownOpen] = useState(false);

    return (
        <Router>
            <div className="app"> {/* Use className instead of style */}
                <nav className="nav"> {/* Use className instead of style */}
                    <ul className="ul"> {/* Use className instead of style */}
                        <li className="li" onMouseEnter={() => setApplicantDropdownOpen(true)} onMouseLeave={() => setApplicantDropdownOpen(false)}>
                            <span className="dropdownTrigger">Applicant</span> {/* Use className instead of style */}
                            {isApplicantDropdownOpen && (
                                <div className="dropdown"> {/* Use className instead of style */}
                                    <Link to="/applicant/signup" className="link">Signup</Link> {/* Use className instead of style */}
                                    <Link to="/applicant/login" className="link">Login</Link> {/* Use className instead of style */}
                                </div>
                            )}
                        </li>
                        <li className="li" onMouseEnter={() => setOrganizationDropdownOpen(true)} onMouseLeave={() => setOrganizationDropdownOpen(false)}>
                            <span className="dropdownTrigger">Organization</span> {/* Use className instead of style */}
                            {isOrganizationDropdownOpen && (
                                <div className="dropdown"> {/* Use className instead of style */}
                                    <Link to="/organization/signup" className="link">Signup</Link> {/* Use className instead of style */}
                                    <Link to="/organization/login" className="link">Login</Link> {/* Use className instead of style */}
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

export default App;
