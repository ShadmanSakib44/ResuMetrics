/* eslint-disable */
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
  Avatar,
} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import FileUploadInput from "../lib/FileUploadInput";
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";

import { SetPopupContext } from "../App";

import apiList, {server} from "../lib/apiList";
import imgProfile from "./Profile data-bro.png";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
    color:"#d2e3c8",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // padding: "30px",
  },
  avatar: {
    alignSelf:"center",
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
  updateButton: {
    width: "300px",
    borderRadius: "8px",
    height: "50px",
    background: "#4f6f52", // Set button background color
    color: "#ffffff", // Set button text color
    // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add darker background shadow
    "&:hover": {
      background: "#385943", // Darker background on hover
    },
    padding: "10px 50px",
     marginTop: "30px",
  },
  inputBox: {
    width: "100%", // Responsive width
    [theme.breakpoints.up("md")]: {
      width: "600px", // Width for medium and up screens
    },
    '& .MuiButton-root': {
      backgroundColor: '#4f6f52',
      color: 'white',
    },
  },
}));

const MultifieldInput = (props) => {
  const classes = useStyles();
  const { education, setEducation } = props;

  return (
    <>
      {education.map((obj, key) => (
        <Grid item container className={classes.inputBox} key={key}>
          <Grid item xs={6}>
            <TextField
              label={`Institution Name #${key + 1}`}
              value={education[key].institutionName}
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].institutionName = event.target.value;
                setEducation(newEdu);
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Start Year"
              value={obj.startYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].startYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="End Year"
              value={obj.endYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].endYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item style={{ alignSelf: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          style={{backgroundColor: '#4f6f52'}}
          onClick={() =>
            setEducation([
              ...education,
              {
                institutionName: "",
                startYear: "",
                endYear: "",
              },
            ])
          }
          className={classes.inputBox}
        >
          Add another institution details
        </Button>
      </Grid>
    </>
  );
};

const Profile = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [userData, setUserData] = useState();
  const [open, setOpen] = useState(false);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    education: [],
    skills: [],
    resume: "",
    profile: "",
  });

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProfileDetails(response.data);
        if (response.data.education.length > 0) {
          setEducation(
            response.data.education.map((edu) => ({
              institutionName: edu.institutionName ? edu.institutionName : "",
              startYear: edu.startYear ? edu.startYear : "",
              endYear: edu.endYear ? edu.endYear : "",
            }))
          );
        }
      })
      .catch((err) => {
        //console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

   
  const getResume= ()=>{
    const address = `${profileDetails.resume}`;
    console.log(address)
    if(address!=="")
    {
      window.open(address)
      // console.log(error);
        
    }else{
      setPopup({
        open: true,
        severity: "error",
        message: "You have not uploaded any resume. Upload one to view!",
      });
    }
    
  }


  const handleClose = () => {
    setOpen(false);
  };

  const editDetails = () => {
    setOpen(true);
  };

  const handleUpdate = () => {
    console.log(education);

    let updatedDetails = {
      ...profileDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"];
          }
          return obj;
        }),
    };

    axios
      .put(apiList.user, updatedDetails, {
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
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        console.log(err.response);
      });
    setOpen(false);
  };
  
  return (
    <>

      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "150px", minHeight: "93vh",background:"#d2e3c8" }}
        
      >
         <>
            <Grid item style={{ marginTop: "30px", animation: "bounce 1s infinite",marginBottom:"20px" }}>
              <Typography variant="h3" style={{ color: "#4f6f52", fontWeight: "bold" }}>
                Applicant's Profile
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

        
        <Grid item xs>
          <Paper
            style={{
              padding: "30px",
              outline: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            
          >
            <Grid
                container direction="column" alignItems="center" 
                xs={2}
                style={{
                  display:"center",
                  justifyContent: "center",
                  alignItems: "center",
                  float:"left",
                }}
              >
                <Avatar
                  src={`${profileDetails.profile}`}
                  className={classes.avatar}
                  
                />
                <Typography variant="h3" component="h2" style={{color:"#4f6f52",fontWeight:"bold"}}>
                {profileDetails.name}
                </Typography>
              </Grid>
            <Grid container direction="column" alignItems="" spacing={3}>
            
            {/* <Grid item >
              
            </Grid> */}
            
              <Grid item>
                <TextField
                  label="Name"
                  value={profileDetails.name}
                  onChange={(event) => handleInput("name", event.target.value)}
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <MultifieldInput
                education={education}
                setEducation={setEducation}
              />
              <Grid item>
                <ChipInput
                  className={classes.inputBox}
                  label="Skills"
                  variant="outlined"
                  helperText="Press enter to add skills"
                  value={profileDetails.skills}
                  onAdd={(chip) =>
                    setProfileDetails({
                      ...profileDetails,
                      skills: [...profileDetails.skills, chip],
                    })
                  }
                  onDelete={(chip, index) => {
                    let skills = profileDetails.skills;
                    skills.splice(index, 1);
                    setProfileDetails({
                      ...profileDetails,
                      skills: skills,
                    });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <FileUploadInput
                  className={classes.inputBox}
                  label="Resume (.jpg/.png)"
                  style={{background:"#4f6f52"}}
                  icon={<DescriptionIcon />}
                  uploadTo={apiList.uploadResume}
                  handleInput={handleInput}
                  identifier={"resume"}
                />
              </Grid>
              <Grid item>
              <Button
                variant="contained"
                className={classes.statusBlock}
                color="primary"
                onClick={() => getResume()}
                style={{alignItems:"center",background:"#4f6f52"}}
              >
                View Uploaded Resume
              </Button>
              </Grid>
              <Grid item>
                <FileUploadInput
                  className={classes.inputBox}
                  label="Profile Photo (.jpg/.png)"
                  icon={<FaceIcon />}
                  uploadTo={apiList.uploadProfileImage}
                  handleInput={handleInput}
                  identifier={"profile"}
                />
              </Grid>
              
            </Grid>
            <Button
              variant="contained"
              className={classes.updateButton}
              onClick={() => handleUpdate()}
            >
              Update Details
            </Button>
          </Paper>
          
        </Grid>
      </Grid>
      <Footer/>
    </>
  );
};

export default Profile;