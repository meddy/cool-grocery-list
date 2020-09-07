import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

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
  const [user, setUser] = useState<firebase.User | null | false>(false);
  const isLoading = user === false;
  const isAuthenticated = !!user;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <Switch>
      <Route exact path="/sign-up">
        {isAuthenticated && <Redirect to="/" />}
        {!isAuthenticated && <SignUp />}
      </Route>
      <Route path="/">
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
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="sm">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {!isAuthenticated && (
              <Route path="*">
                <Redirect to="/sign-up" />
              </Route>
            )}
            <Route exact path="/lists">
              <Lists />
            </Route>
            <Route path="*">
              <h1>Not Found</h1>
            </Route>
          </Switch>
        </Container>
      </Route>
    </Switch>
  );
}
