// Footer.js
import React from 'react';
import { Typography } from '@material-ui/core';

const Footer = () => {
  return (
    <div className="footer" >
        <Typography variant="body1" style={{ textAlign: "center", fontSize: "14px", color: "#4f6f52", marginTop: "20px" }}>
          © 2024 ResuMetrics. All rights reserved.
        </Typography>
    </div>
  );
};

export default Footer;
