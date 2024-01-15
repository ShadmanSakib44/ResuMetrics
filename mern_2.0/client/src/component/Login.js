// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import {
//   Grid,
//   TextField,
//   Button,
//   Typography,
//   makeStyles,
//   Paper,
// } from "@material-ui/core";
// import axios from "axios";
// import "../index.css";

// import PasswordInput from "../lib/PasswordInput";
// import EmailInput from "../lib/EmailInput";
// import { SetPopupContext } from "../App";

// import apiList from "../lib/apiList";
// import isAuth from "../lib/isAuth";

// import img from './login-img.png';

// const useStyles = makeStyles((theme) => ({
//   body: {
//     padding: "60px 60px",
//   },
//   inputBox: {
//     width: "300px",
//   },
//   submitButton: {
//     width: "300px",
//   },
// }));

// const Login = (props) => {
//   const classes = useStyles();
//   const setPopup = useContext(SetPopupContext);
//   const navigate = useNavigate(); // Use the useNavigate hook
//   const [loggedin, setLoggedin] = useState(isAuth());

//   const [loginDetails, setLoginDetails] = useState({
//     email: "",
//     password: "",
//   });

//   const [inputErrorHandler, setInputErrorHandler] = useState({
//     email: {
//       error: false,
//       message: "",
//     },
//     password: {
//       error: false,
//       message: "",
//     },
//   });

//   const handleInput = (key, value) => {
//     setLoginDetails({
//       ...loginDetails,
//       [key]: value,
//     });
//   };

//   const handleInputError = (key, status, message) => {
//     setInputErrorHandler({
//       ...inputErrorHandler,
//       [key]: {
//         error: status,
//         message: message,
//       },
//     });
//   };

//   const handleLogin = () => {
//     const verified = !Object.keys(inputErrorHandler).some((obj) => {
//       return inputErrorHandler[obj].error;
//     });
//     if (verified) {
//       axios
//         .post(apiList.login, loginDetails)
//         .then((response) => {
//           localStorage.setItem("token", response.data.token);
//           localStorage.setItem("type", response.data.type);
//           setLoggedin(isAuth());
//           setPopup({
//             open: true,
//             severity: "success",
//             message: "Logged in successfully",
//           });
//           navigate("/"); // Navigate to the home page on successful login
//         })
//         .catch((err) => {
//           setPopup({
//             open: true,
//             severity: "error",
//             message: err.response.data.message,
//           });
//         });
//     } else {
//       setPopup({
//         open: true,
//         severity: "error",
//         message: "Incorrect Input",
//       });
//     }
//   };

//   if (loggedin) {
//     navigate("/"); // Redirect user if already logged in
//     return null;
//   }

//   return (
//     <Grid container direction="row">
//       <div style={{alignItems:"center", marginLeft:"15%", marginTop:""}}>
//         <img src={img} width="400px" height="450px" alt="Login"></img>
//       </div>
//       <Paper elevation={3} className={classes.body}>
//         <Grid container direction="column" spacing={4} alignItems="center">
//           <Grid item>
//             <Typography variant="h3" component="h2" style={{color:"#3f51b5", fontWeight:"bold"}}>
//               Welcome to ResuMetrice
//             </Typography>
//           </Grid>
//           <Grid item>
//             <EmailInput
//               label="Email"
//               value={loginDetails.email}
//               onChange={(event) => handleInput("email", event.target.value)}
//               inputErrorHandler={inputErrorHandler}
//               handleInputError={handleInputError}
//               className={classes.inputBox}
//             />
//           </Grid>
//           <Grid item>
//             <PasswordInput
//               label="Password"
//               value={loginDetails.password}
//               onChange={(event) => handleInput("password", event.target.value)}
//               className={classes.inputBox}
//             />
//           </Grid>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleLogin}
//               className={classes.submitButton}
//               style={{ borderRadius: "8px", width: "130px", height: "50px" }}
//             >
//               Login
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Grid>
//   );
// };

// export default Login;

/* eslint-disable */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import "../index.css";

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";

import img from './login-img.png';

const useStyles = makeStyles((theme) => ({
  body: {
    padding: "60px 60px",
    background: "#d2e3c8",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  transparentContainer: {
    background: "rgba(244, 249, 240, 0.8)", // Set transparent background
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
  },
  inputBox: {
    width: "300px",
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
  },
  smallerLine: {
    width: "50px",
    height: "3px",
    background: "#3f51b5",
    margin: "10px auto",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const navigate = useNavigate();
  const [loggedin, setLoggedin] = useState(isAuth());

  // ... (rest of the component remains unchanged)

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    if (verified) {
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          navigate("/"); // Navigate to the home page on successful login
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  if (loggedin) {
    navigate("/"); // Redirect user if already logged in
    return null;
  }


  return (
    <Grid container direction="row"  >
      <div style={{ alignItems: "center", marginLeft: "15%" }}>
        <img src={img} width="400px" height="450px" alt="Login"></img>
      </div>
      <Paper elevation={3} className={classes.body}>
        <Grid
          container
          direction="column"
          spacing={4}
          alignItems="center"
          className={classes.transparentContainer}
        >
          <Grid item>
            <Typography variant="h3" component="h2" style={{ color: "#4f6f52", fontWeight: "bold" }}>
              Welcome to ResuMetrice
            </Typography>
            <div className={classes.smallerLine}></div>
            <Typography variant="subtitle1" style={{ color: "#4f6f52" }}>
              Login to get started
            </Typography>
          </Grid>
          {/* ... (rest of the component remains unchanged) */}
          <Grid item>
           <EmailInput
              label="Email"
              value={loginDetails.email}
              onChange={(event) => handleInput("email", event.target.value)}
              inputErrorHandler={inputErrorHandler}
              handleInputError={handleInputError}
              className={classes.inputBox}
            />
          </Grid>
          <Grid item>
            <PasswordInput
              label="Password"
              value={loginDetails.password}
              onChange={(event) => handleInput("password", event.target.value)}
              className={classes.inputBox}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              className={classes.submitButton}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;

