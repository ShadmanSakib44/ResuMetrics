// import { useContext, useEffect, useState } from "react";
// import {
//   Button,
//   Grid,
//   Typography,
//   Modal,
//   Paper,
//   makeStyles,
//   TextField,
// } from "@material-ui/core";
// import axios from "axios";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/material.css";

// import { SetPopupContext } from "../../App";

// import apiList from "../../lib/apiList";

// const useStyles = makeStyles((theme) => ({
//   body: {
//     height: "inherit",
//   },
//   popupDialog: {
//     height: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     // padding: "30px",
//   },
// }));

// const Profile = (props) => {
//   const classes = useStyles();
//   const setPopup = useContext(SetPopupContext);

//   const [profileDetails, setProfileDetails] = useState({
//     name: "",
//     bio: "",
//     contactNumber: "",
//   });

//   const [phone, setPhone] = useState("");

//   const handleInput = (key, value) => {
//     setProfileDetails({
//       ...profileDetails,
//       [key]: value,
//     });
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     axios
//       .get(apiList.user, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         setProfileDetails(response.data);
//         setPhone(response.data.contactNumber);
//       })
//       .catch((err) => {
//         console.log(err.response.data);
//         setPopup({
//           open: true,
//           severity: "error",
//           message: "Error",
//         });
//       });
//   };

//   const handleUpdate = () => {
//     let updatedDetails = {
//       ...profileDetails,
//     };
//     if (phone !== "") {
//       updatedDetails = {
//         ...profileDetails,
//         contactNumber: `+${phone}`,
//       };
//     } else {
//       updatedDetails = {
//         ...profileDetails,
//         contactNumber: "",
//       };
//     }

//     axios
//       .put(apiList.user, updatedDetails, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((response) => {
//         setPopup({
//           open: true,
//           severity: "success",
//           message: response.data.message,
//         });
//         getData();
//       })
//       .catch((err) => {
//         setPopup({
//           open: true,
//           severity: "error",
//           message: err.response.data.message,
//         });
//         console.log(err.response);
//       });
//   };

//   return (
//     <>
//       <Grid
//         container
//         item
//         direction="column"
//         alignItems="center"
//         style={{ padding: "30px", minHeight: "93vh" }}
//       >
        
//         <Grid item xs style={{ width: "100%" }}>
//           <Paper
//             style={{
//               padding: "20px",
//               outline: "none",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               //   width: "60%",
//             }}
//           >
//             <Grid container direction="column" alignItems="stretch" spacing={3}>
//             <Grid item >
//               <Typography variant="h3" component="h2" style={{color:"#3f51b5",fontWeight:"bold"}}>
//                 Profile
//               </Typography>
//             </Grid>
//               <Grid item>
//                 <TextField
//                   label="Name"
//                   value={profileDetails.name}
//                   onChange={(event) => handleInput("name", event.target.value)}
//                   className={classes.inputBox}
//                   variant="outlined"
//                   fullWidth
//                   style={{ width: "100%" }}
//                 />
//               </Grid>
//               <Grid item>
//                 <TextField
//                   label="Bio (upto 250 words)"
//                   multiline
//                   rows={8}
//                   style={{ width: "100%" }}
//                   variant="outlined"
//                   value={profileDetails.bio}
//                   onChange={(event) => {
//                     if (
//                       event.target.value.split(" ").filter(function (n) {
//                         return n != "";
//                       }).length <= 250
//                     ) {
//                       handleInput("bio", event.target.value);
//                     }
//                   }}
//                 />
//               </Grid>
//               <Grid
//                 item
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                 }}
//               >
//                 <PhoneInput
//                   country={"in"}
//                   value={phone}
//                   onChange={(phone) => setPhone(phone)}
//                   style={{ width: "auto" }}
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               variant="contained"
//               color="primary"
//               style={{ padding: "10px 50px", marginTop: "30px" }}
//               onClick={() => handleUpdate()}
//             >
//               Update Details
//             </Button>
//           </Paper>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default Profile;
/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  makeStyles,
  TextField,
} from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import axios from "axios";
import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: "rgba(210, 227, 200, 0.9)", // Adjusted color and added transparency
    borderRadius: "12px", // Optional: Adjusted border-radius for a rounded look
  },
  heading: {
    color: "#4f6f52", // Text color
    fontWeight: "bold",
  },
  inputBox: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  bioInput: {
    width: "100%",
  },
  phoneInput: {
    width: "auto",
    marginBottom: theme.spacing(2),
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
  },
  
}));

const Profile = () => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    bio: "",
    contactNumber: "",
  });

  const [phone, setPhone] = useState("");

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
        setProfileDetails(response.data);
        setPhone(response.data.contactNumber);
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
  };

  const handleUpdate = () => {
    let updatedDetails = {
      ...profileDetails,
    };
    if (phone !== "") {
      updatedDetails = {
        ...profileDetails,
        contactNumber: `+${phone}`,
      };
    } else {
      updatedDetails = {
        ...profileDetails,
        contactNumber: "",
      };
    }

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
  };

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      style={{ padding: "300px", minHeight: "93vh", background:"#d2e3c8" }}
    >
      <Grid item xs={12} style={{ width: "50%" }}>
        <Paper className={classes.paper}>
          <Typography variant="h3" component="h2" className={classes.heading}>
            Recruiter Profile
          </Typography>
          <TextField
            label="Name"
            value={profileDetails.name}
            onChange={(event) => handleInput("name", event.target.value)}
            className={classes.inputBox}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Bio (upto 250 words)"
            multiline
            rows={8}
            className={classes.bioInput}
            variant="outlined"
            value={profileDetails.bio}
            onChange={(event) => {
              if (
                event.target.value.split(" ").filter(function (n) {
                  return n !== "";
                }).length <= 250
              ) {
                handleInput("bio", event.target.value);
              }
            }}
          />
          <PhoneInput
            country={"in"}
            value={phone}
            onChange={(phone) => setPhone(phone)}
            className={classes.phoneInput}
          />
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
  );
};

export default Profile;
