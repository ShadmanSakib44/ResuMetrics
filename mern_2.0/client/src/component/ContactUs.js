import React from "react";
import { Grid, Typography } from "@material-ui/core";
import ContactUsImage from './Contact us-amico.png'; // Replace with the actual path to your image

const ContactUs = () => {
  return (
    <div className="contact-us-section">
      <Grid container item direction="row" alignItems="center" justify="center" style={{ marginTop: "30px" }}>
        <Grid item xs={12} md={8}>
          <Typography variant="body1" style={{ textAlign: "center", fontSize: "24px", fontWeight: "600", color: "#4f6f52" }}>
            Contact Us
          </Typography>
          <Typography variant="body2" style={{ textAlign: "center", fontSize: "18px", color: "black", marginTop: "10px" }}>
            We'd love to hear from you! If you have any questions or inquiries, feel free to contact us using the information below.
          </Typography>
          {/* Add your contact information (email, phone, etc.) here */}
        </Grid>
        <Grid item xs={12} md={4}>
          <img src={ContactUsImage} alt="Contact Us" style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactUs;
