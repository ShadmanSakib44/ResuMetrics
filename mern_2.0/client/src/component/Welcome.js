
import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import video1 from './video1.mp4';
import "./Welcome.css"; // Import a separate CSS file for styling

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
    <Grid container item direction="column" alignItems="center" justify="center">
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
        {/* <div className="text-overlay">
          <Typography variant="h6">
            A smart solution to Resume related problems
          </Typography>
          <Typography variant="h2">
            FIND THE PERFECT <em>JOB</em>
          </Typography>
        </div> */}
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
        A Platform for Handling <em style={{ fontStyle: "normal", color: "#ed563b", fontWeight: "500" }}>JOBs and Applicants</em>
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
