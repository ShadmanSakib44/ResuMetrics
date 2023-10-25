import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ApplicantSignup from "./components/ApplicantSignup";
import ApplicantLogin from "./components/ApplicantLogin";
import OrganizationSignup from "./components/OrganizationSignup";
import OrganizationLogin from "./components/OrganizationLogin";
import ApplicantProfile from "./components/ApplicantProfile";
import OrganizationProfile from "./components/OrganizationProfile";
import "./App.css"; // Import the CSS file

function NavigationLinks() {
  const location = useLocation();

  const isApplicantRoute = location.pathname.includes("applicant");
  const isOrganizationRoute = location.pathname.includes("organization");

  return (
    <ul className="ul">
      {isApplicantRoute && (
        <>
          <li className="li">
            <a href="/applicant/signup" className="link">
              Applicant Signup
            </a>
          </li>
          <li className="li">
            <a href="/applicant/login" className="link">
              Applicant Login
            </a>
          </li>
        </>
      )}
      {isOrganizationRoute && (
        <>
          <li className="li">
            <a href="/organization/signup" className="link">
              Organization Signup
            </a>
          </li>
          <li className="li">
            <a href="/organization/login" className="link">
              Organization Login
            </a>
          </li>
        </>
      )}
    </ul>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        {" "}
        {/* Use className instead of style */}
        <nav className="nav">
          {" "}
          {/* Use className instead of style */}
          <NavigationLinks />
        </nav>
        <Routes>
          <Route path="/applicant/signup" element={<ApplicantSignup />} />
          <Route path="/applicant/login" element={<ApplicantLogin />} />
          <Route path="/applicant/profile" element={<ApplicantProfile />} />
          <Route path="/organization/signup" element={<OrganizationSignup />} />
          <Route path="/organization/login" element={<OrganizationLogin />} />
          <Route
            path="/organization/profile"
            element={<OrganizationProfile />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
