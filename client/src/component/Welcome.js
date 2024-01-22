import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
<<<<<<< Updated upstream
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import video1 from './video1.mp4';
=======
>>>>>>> Stashed changes
import { Link } from "react-router-dom";
import "./Welcome.css"; // Import a separate CSS file for styling
import img1 from './Job hunt-amico.png';
import img2 from './Interview-rafiki.png';
import ContactUs from './ContactUs';
import isAuth from "../lib/isAuth";
import video1 from './video1.mp4';

const Welcome = (props) => {
  const videos = [video1];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 8000); // Adjust the delay (in milliseconds) as needed

    return () => clearInterval(interval);
  }, [currentVideoIndex, videos.length]);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

<<<<<<< Updated upstream
  const scrollToAbout = () => {
    scroll.scrollTo(document.getElementById("about-section").offsetTop, {
      duration: 800,
      smooth: "easeInOutQuart",
    });
  };

=======
>>>>>>> Stashed changes
  return (
    <Grid container item direction="column" alignItems="center" justify="center">
      <div className="video-container">
        <div className="caption header-text">
          {videos.map((videoSrc, index) => (
            <video
              key={videoSrc}
              className={`videoTag ${index === currentVideoIndex ? 'active' : ''}`}
              autoPlay
              loop
              muted
              onEnded={handleVideoEnd}
              style={{
                minWidth: "100%",
                minHeight: "100vh",
                maxWidth: "100%",
                maxHeight: "100vh",
                objectFit: "cover",
                zIndex: "-1",
                boxSizing: "border-box",
              }}
              ref={videoRef}
            >
              <source src={videoSrc} type='video/mp4' />
            </video>
          ))}
          <div className="text-overlay">
            <Typography variant="h6" style={{
              fontSize: "18px",
              fontWeight: "800",
              color: "#4f6f52",
              marginBottom: "10px"
            }}>
              A smart solution to Resume related problems
            </Typography>
            <Typography variant="h2" style={{
              fontSize: "36px",
              fontWeight: "800",
              color: "#4f6f52",
              letterSpacing: "1px"
            }}>
              A Platform for Handling <em style={{ fontFamily: "'Funkster', cursive", color: "#ed563b", fontWeight: "500" }}>JOBs and Applicants</em>
            </Typography>
            <Typography variant="body1" style={{
              fontSize: "16px",
              color: "black",
              marginTop: "20px"
            }}>
              Unlock your career potential with our innovative resume solutions.
            </Typography>
            <Typography variant="body1" style={{
              fontSize: "16px",
              color: "black",
              marginTop: "10px"
            }}>
              Stand out from the crowd and land your dream job today!
            </Typography>
            {!isAuth() && (
              <>
                <Link to="/login">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{
                      marginTop: "20px",
                      background: "#4f6f52",
                      color: "#ffffff",
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    style={{
                      marginTop: "20px",
                      marginLeft: "10px",
                      background: "#ed563b",
                    }}
                  >
                    Signup
                  </Button>
                </Link>
              </>
            )}
<<<<<<< Updated upstream
            <div className="button-container">
        <a href="http://localhost:3001/" target="_blank" rel="noopener noreferrer">
=======
            <div>
            <a href="http://localhost:3001/" target="_blank" rel="noopener noreferrer">
>>>>>>> Stashed changes
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{
              marginTop: "20px",
              background: "#4f6f52",
              color: "#ffffff",
            }}
          >
<<<<<<< Updated upstream
            Build your Resume
          </Button>
        </a>
      </div>

<div>
          <ScrollLink to="about-section" smooth={true} duration={800}>
            <Typography
              variant="body1"
              style={{
                fontSize: "16px",
                color: "black",
                marginTop: "10px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={scrollToAbout}
            >
              Learn more...
            </Typography>
          </ScrollLink>

          </div>
          

          </div>


        </div>

      </div>

      <div id="about-section" className="about-section">
        <Grid container item direction="row" alignItems="center" justify="center" style={{ marginTop: "30px" }}>
          <Grid item xs={12} md={4}>
            <img
              src={img1}
              alt="About Left"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                transition: "transform 0.5s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" style={{ textAlign: "center", fontSize: "60px", fontWeight: "1000", color: "#4f6f52" }}>
              About Our Website
            </Typography>
            <Typography variant="body2" style={{ textAlign: "center", fontSize: "18px", color: "black", marginTop: "10px" }}>
              Here you can find a smart solution to resume-related problems. Our platform is designed to handle jobs and applicants efficiently.
              Unlock your career potential with our innovative resume solutions and stand out from the crowd to land your dream job.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <img
              src={img2}
              alt="About Right"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                transition: "transform 0.5s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </Grid>
=======
           Build Your Resume
          </Button>
        </a>

            </div>
                  
          </div>
        </div>
      </div>

      
    <div className="about-section">
      <Grid container item direction="row" alignItems="center" justify="center" style={{ marginTop: "30px" }}>
        <Grid item xs={12} md={4}>
          <img
            src={img1}
            alt="About Left"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              transition: "transform 0.5s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
>>>>>>> Stashed changes
        </Grid>
      </div>
      <ContactUs />
      <div className="footer">
        <Typography variant="body1" style={{ textAlign: "center", fontSize: "14px", color: "#4f6f52", marginTop: "20px" }}>
          © 2024 ResuMetrics. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
};

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify-content="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
