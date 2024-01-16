
import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import video1 from './video1.mp4';
import "./Welcome.css"; // Import a separate CSS file for styling
import img1 from './Job hunt-amico.png';
import img2 from './Interview-rafiki.png';
import ContactUs from './ContactUs';

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

  return (
    // <Grid container item direction="column" alignItems="center" justify="center">
    //   <div className="caption header-text">
    //     {videos.map((videoSrc, index) => (
    //       <video
    //         key={videoSrc}
    //         className={`videoTag ${index === currentVideoIndex ? 'active' : ''}`}
    //         autoPlay
    //         loop
    //         muted
    //         onEnded={handleVideoEnd}
    //         style={{
    //           minWidth: "100%",
    //           minHeight: "100vh",
    //           maxWidth: "100%",
    //           maxHeight: "100vh",
    //           objectFit: "cover",
    //           zIndex: "-1",
    //           boxSizing: "border-box",
    //         }}
    //         ref={videoRef}
    //       >
    //         <source src={videoSrc} type='video/mp4' />
    //       </video>
    //     ))}
    //      <div className="text-overlay">
    //   <Typography variant="h6" style={{
    //     fontSize: "18px",
    //     fontWeight: "800",
    //     color: "#4f6f52",
    //     marginBottom: "10px"
    //   }}>
    //     A smart solution to Resume related problems
    //   </Typography>
    //   <Typography variant="h2" style={{
    //     fontSize: "36px",
    //     fontWeight: "800",
    //     color: "#4f6f52",
    //     letterSpacing: "1px"
    //   }}>
    //     A Platform for Handling <em style={{ fontStyle: "normal", color: "#ed563b", fontWeight: "500" }}>JOBs and Applicants</em>
    //   </Typography>
    //   <Typography variant="body1" style={{
    //     fontSize: "16px",
    //     color: "black",
    //     marginTop: "20px"
    //   }}>
    //     Unlock your career potential with our innovative resume solutions.
    //   </Typography>
    //   <Typography variant="body1" style={{
    //     fontSize: "16px",
    //     color: "black",
    //     marginTop: "10px"
    //   }}>
    //     Stand out from the crowd and land your dream job today!
    //   </Typography>
    // </div>

    //   </div>
    // </Grid>
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
        </div>
      </div>
    </div>

    <div className="about-section">
      <Grid container item direction="row" alignItems="center" justify="center" style={{ marginTop: "30px" }}>
        <Grid item xs={12} md={4}>
          <img src={img1} alt="About Left" style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body1" style={{ textAlign: "center", fontSize: "20px", fontWeight: "500", color: "#4f6f52" }}>
            About Our Website
          </Typography>
          <Typography variant="body2" style={{ textAlign: "center", fontSize: "18px", color: "black", marginTop: "10px" }}>
            Here you can find a smart solution to resume-related problems. Our platform is designed to handle jobs and applicants efficiently.
            Unlock your career potential with our innovative resume solutions and stand out from the crowd to land your dream job.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <img src={img2} alt="About Right" style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }} />
        </Grid>
      </Grid>
    </div>
    <ContactUs/>
    <div className="footer" >
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
