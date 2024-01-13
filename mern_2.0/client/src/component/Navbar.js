// import { useNavigate } from "react-router-dom";

// import {
//   AppBar, Toolbar, Typography, Button, makeStyles
// } from "@material-ui/core"; // Import useNavigate

// import isAuth, { userType } from "../lib/isAuth";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// const Navbar = (props) => {
//   const classes = useStyles();
//   const navigate = useNavigate(); // Use the useNavigate hook

//   const handleClick = (location) => {
//     console.log(location);
//     navigate(location); // Use navigate to change the location
//   };
  
//     return (
//       <AppBar position="fixed" background= "transparent">
//         <Toolbar style={{minHeight: "80px"}}>
//           <Typography variant="h6" className={classes.title} style={{fontSize: "32px",fontWeight: "800"}}>
//           <img src="https://www.linkpicture.com/q/job-search.png" width="30px" height="auto"></img>ResuMetrice
//           </Typography>
//           <div style={{marginTop:"20px"}}>
//           {isAuth() ? (
//             userType() === "recruiter" ? (
//               <>
                
//                 <Button color="inherit" onClick={() => handleClick("/home")}>
//                 <Typography style={{fontSize:"18px"}}>Home</Typography>
//                 </Button>
//                 <Button color="inherit" onClick={() => handleClick("/addjob")}>
//                 <Typography style={{fontSize:"18px"}}>Add Jobs</Typography>
//                 </Button>
//                 <Button color="inherit" onClick={() => handleClick("/myjobs")}>
//                 <Typography style={{fontSize:"18px"}}>Posted</Typography>
//                 </Button>
//                 <Button color="inherit" onClick={() => handleClick("/employees")}>
//                 <Typography style={{fontSize:"18px"}}>Employees</Typography>
//                 </Button>
//                 <Button color="inherit" onClick={() => handleClick("/profile")}>
//                 <Typography style={{fontSize:"18px"}}>Profile</Typography>
//                 </Button>
//                 <Button color="inherit" onClick={() => handleClick("/logout")}>
//                 <Typography style={{fontSize:"18px"}}>Logout</Typography>
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button color="inherit" onClick={() => handleClick("/home")}>
//                 <Typography style={{fontSize:"18px"}}>Home</Typography>
//                 </Button>
//                 <Button
//                   color="inherit"
//                   onClick={() => handleClick("/applications")}
//                 >
//                   <Typography style={{fontSize:"18px"}}>Applied</Typography>
//                 </Button>
//                 <Button color="inherit" onClick={() => handleClick("/profile")}>
//                 <Typography style={{fontSize:"18px"}}>Profile</Typography>
//                 </Button>
//                 <Button color="inherit" onClick={() => handleClick("/logout")}>
//                 <Typography style={{fontSize:"18px"}}>Logout</Typography>
//                 </Button>
//               </>
//             )
//           ) : (
//             <>
//               <Button color="inherit" onClick={() => handleClick("/login")}>
//                 <Typography style={{fontSize:"18px"}}>Login</Typography>
//               </Button>
//               <Button color="inherit" onClick={() => handleClick("/signup")}>
//               <Typography style={{fontSize:"18px"}}>SignUp</Typography>
//               </Button>
//             </>
//           )}
//           </div>
//         </Toolbar>
//       </AppBar>
//     );
//   };
  
//   export default Navbar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import isAuth, { userType } from "../lib/isAuth";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: "auto", // Move the menuButton to the right
  },
  title: {
    display: "flex",
    alignItems: "center", // Align items vertically
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#4f6752",
    color: "#ffffff",
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleClick = (location) => {
    navigate(location);
    setOpenDrawer(false);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ background: "#4f6752" }}>
        <Toolbar style={{ minHeight: "80px" }}>
          <div className={classes.title}>
            <img
              src="https://www.linkpicture.com/q/job-search.png"
              width="30px"
              height="auto"
              alt="logo"
              style={{ marginRight: "10px" }} // Adjust the margin as needed
            />
            <Typography variant="h6" style={{ fontSize: "32px", fontWeight: "800" }}>
              ResuMetrice
            </Typography>
          </div>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="right"
        open={openDrawer}
        onClose={handleDrawerClose}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          {isAuth() ? (
            userType() === "recruiter" ? (
              <>
                <ListItem button onClick={() => handleClick("/home")}>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={() => handleClick("/addjob")}>
                  <ListItemText primary="Add Jobs" />
                </ListItem>
                <ListItem button onClick={() => handleClick("/myjobs")}>
                  <ListItemText primary="Posted" />
                </ListItem>
                <ListItem button onClick={() => handleClick("/employees")}>
                  <ListItemText primary="Employees" />
                </ListItem>
                <ListItem button onClick={() => handleClick("/profile")}>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={() => handleClick("/logout")}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button onClick={() => handleClick("/home")}>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleClick("/applications")}
                >
                  <ListItemText primary="Applied" />
                </ListItem>
                <ListItem button onClick={() => handleClick("/profile")}>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={() => handleClick("/logout")}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            )
          ) : (
            <>
              <ListItem button onClick={() => handleClick("/login")}>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button onClick={() => handleClick("/signup")}>
                <ListItemText primary="SignUp" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
