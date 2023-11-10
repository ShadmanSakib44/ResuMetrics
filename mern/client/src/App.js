import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ApplicantLogin from './components/ApplicantLogin'; // Make sure to import your ApplicantLogin component
import ApplicantSignup from './components/ApplicantSignup';
import OrganizationSignup from './components/OrganizationSignup';
import OrganizationLogin from './components/OrganizationLogin';


import "./App.css"; // Import the CSS file

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/applicant/login" element={<ApplicantLogin />} />
          <Route path="/applicant/signup" element={<ApplicantSignup />} />
          <Route path="/organization/signup" element={<OrganizationSignup />} />
          <Route path="/organization/login" element={<OrganizationLogin />} />
       
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
