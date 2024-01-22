import React from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import ContactUsImage from './Contact us-amico.png'; // Replace with the actual path to your image
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import GitHubIcon from "@material-ui/icons/GitHub";

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
          <Typography variant="body2" style={{ textAlign: "center", fontSize: "18px", color: "black", marginTop: "10px" }}>
            Contact us through:
          </Typography>
          <Grid container direction="row" justify="center" spacing={2}>
            <Grid item>
              <Link href="mailto:oishyfatemaakhand@gmail.com" color="inherit" style={{ textDecoration: "none" }}>
                <EmailIcon style={{ color: "#4f6f52" }} fontSize="large" />
              </Link>
            </Grid>
            <Grid item>
              <Link href="tel:+1234567890" color="inherit" style={{ textDecoration: "none" }}>
                <PhoneIcon style={{ color: "#4f6f52" }} fontSize="large" />
              </Link>
            </Grid>
            <Grid item>
              <Link href="https://github.com/oishy28" target="_blank" rel="noopener noreferrer" color="inherit" style={{ textDecoration: "none" }}>
                <GitHubIcon style={{ color: "#4f6f52" }} fontSize="large" />
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} style={{ overflow: "hidden", borderRadius: "8px", position: "relative" }}>
          <img
            src={ContactUsImage}
            alt="Contact Us"
            style={{ maxWidth: "100%", height: "auto", borderRadius: "8px", transition: "transform 0.5s" }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactUs;
