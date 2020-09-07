import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as firebase from "firebase";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Lists from "./Lists";
import SignUp from "./SignUp";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

export default function App() {
  const classes = useStyles();
  const [user, setUser] = useState<firebase.User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <BrowserRouter>
      <CssBaseline />
      <Route exact path="/sign-up">
        <SignUp isAuthenticated={isAuthenticated} />
      </Route>
      <AppBar
        className={classes.appBar}
        color="default"
        elevation={0}
        position="static"
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            className={classes.toolbarTitle}
            color="inherit"
            noWrap
            variant="h6"
          >
            Cool Grocery List
          </Typography>
          <Button
            className={classes.link}
            color="primary"
            href="#"
            variant="outlined"
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm">
        <Route exact path="/">
          <Home />
        </Route>
        {isAuthenticated && (
          <Switch>
            <Route exact path="/lists">
              <Lists />
            </Route>
          </Switch>
        )}
        {!isAuthenticated && <Redirect to="/sign-up" />}
      </Container>
    </BrowserRouter>
  );
}
