
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
import logo from './logo1.png';

import isAuth, { userType } from "../lib/isAuth";

const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: "auto",
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#4f6752",
    color: "#ffffff",
  },
  appBar: {
    background: "#4f6752",
    transition: "background 0.3s",
  },
  appBarHover: {
    background: "#333",
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
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ minHeight: "80px" }}>
          <div className={classes.title}>
            <img
              src={logo}
              width="60px"
              height="auto"
              alt="logo"
              style={{ marginRight: "0px" }} 
            />
            <Typography variant="h6" style={{ fontSize: "32px", fontWeight: "800", fontFamily: "'Funkster', cursive" }}>
              ResuMetrics
            </Typography>
          </div>
          {isAuth() && (
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
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
          ) : null}
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
