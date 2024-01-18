

import { useContext, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  makeStyles,
  TextField,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";

import { SetPopupContext } from "../../App";

import apiList from "../../lib/apiList";
import Footer from "../Footer";

const useStyles = makeStyles((theme) => ({
  container: { // Set grid background color
    padding: theme.spacing(3),
    minHeight: "85vh", // Adjusted container height
    width: "40%", // Adjusted container width
    margin: "auto", // Center the container
  },
  paper: {
    padding: theme.spacing(4),
    outline: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d2e3c8",
  },
  header: {
    color: "#4f6f52", // Set text color
    fontWeight: "bold",
  },
  inputBox: {
    width: "100%",
    marginBottom: theme.spacing(3),
  },
  submitButton: {
    width: "300px",
    borderRadius: "8px",
    height: "50px",
    background: "#4f6f52", // Set button background color
    color: "#ffffff", // Set button text color
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add darker background shadow
    "&:hover": {
      background: "#385943", // Darker background on hover
    },
    marginTop: theme.spacing(3),
    alignSelf: "center", // Center the button
  },
}));

const CreateJobs = () => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [jobDetails, setJobDetails] = useState({
    title: "",
    maxApplicants: 100,
    maxPositions: 30,
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 16),
    skillsets: [],
    jobType: "Full Time",
    duration: 0,
    salary: 0,
  });

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleUpdate = () => {
    console.log(jobDetails);
    axios
      .post(apiList.jobs, jobDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        setJobDetails({
          title: "",
          maxApplicants: 100,
          maxPositions: 30,
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: "Full Time",
          duration: 0,
          salary: 0,
        });
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        console.log(err.response);
      });
  };

  return (
    <>
    
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        className={classes.container}
        
      >
 <>
            <Grid item style={{ marginTop: "30px", animation: "bounce 1s infinite",marginBottom:"20px" }}>
              <Typography variant="h3" style={{ color: "#4f6f52", fontWeight: "bold" }}>
              Create Job Opportunities
              </Typography>
            </Grid>

            <style>
              {`
                @keyframes bounce {
                  0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                  }
                  40% {
                    transform: translateY(-10px);
                  }
                  60% {
                    transform: translateY(-10px);
                  }
                }
              `}
            </style>
          </>
        <Grid item container xs direction="column" justify="center">
          <Grid item>
            <Paper className={classes.paper}>
              <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item>
                  <TextField
                    label="Title"
                    value={jobDetails.title}
                    onChange={(event) =>
                      handleInput("title", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <ChipInput
                    className={classes.inputBox}
                    label="Skills"
                    variant="outlined"
                    helperText="Press enter to add skills"
                    value={jobDetails.skillsets}
                    onAdd={(chip) =>
                      setJobDetails({
                        ...jobDetails,
                        skillsets: [...jobDetails.skillsets, chip],
                      })
                    }
                    onDelete={(chip, index) => {
                      let skillsets = jobDetails.skillsets;
                      skillsets.splice(index, 1);
                      setJobDetails({
                        ...jobDetails,
                        skillsets: skillsets,
                      });
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    select
                    label="Job Type"
                    variant="outlined"
                    value={jobDetails.jobType}
                    onChange={(event) => {
                      handleInput("jobType", event.target.value);
                    }}
                    fullWidth
                  >
                    <MenuItem value="Full Time">Full Time</MenuItem>
                    <MenuItem value="Part Time">Part Time</MenuItem>
                    <MenuItem value="Work From Home">(Remote)Work From Home</MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    select
                    label="Duration"
                    variant="outlined"
                    value={jobDetails.duration}
                    onChange={(event) => {
                      handleInput("duration", event.target.value);
                    }}
                    fullWidth
                  >
                    <MenuItem value={0}>Flexible</MenuItem>
                    <MenuItem value={1}>1 Month</MenuItem>
                    <MenuItem value={3}>3 Months</MenuItem>
                    <MenuItem value={6}>6 Months</MenuItem>
                    <MenuItem value={12}>1 Year</MenuItem>
                    <MenuItem value={24}>2 Years</MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    label="Salary(in BDT(taka))"
                    type="number"
                    variant="outlined"
                    color="#d2e3c8"
                    value={jobDetails.salary}
                    onChange={(event) => {
                      handleInput("salary", event.target.value);
                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Application Deadline"
                    type="datetime-local"
                    value={jobDetails.deadline}
                    onChange={(event) => {
                      handleInput("deadline", event.target.value);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Maximum Number Of Applicants"
                    type="number"
                    variant="outlined"
                    value={jobDetails.maxApplicants}
                    onChange={(event) => {
                      handleInput("maxApplicants", event.target.value);
                    }}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Positions Available"
                    type="number"
                    variant="outlined"
                    value={jobDetails.maxPositions}
                    onChange={(event) => {
                      handleInput("maxPositions", event.target.value);
                    }}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                  onClick={() => handleUpdate()}
                >
                  Create job
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Footer/>
    </>
  );
};

export default CreateJobs;
