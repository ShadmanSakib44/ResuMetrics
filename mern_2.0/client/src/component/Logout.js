import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { SetPopupContext } from "../App";

const Logout = (props) => {
  const setPopup = useContext(SetPopupContext);
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    setPopup({
      open: true,
      severity: "success",
      message: "Logged out successfully",
    });

    navigate("/login"); // Navigate to the login page after logout
  }, [navigate, setPopup]);

  return null; // As the redirection is handled in the useEffect, you don't need to return anything here
};

export default Logout;
