import {
  AppBar,
  Container,
  LinearProgress,
  Link,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import {
  Link as RouterLink,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

import AuthButton from "./AuthButton";
import Home from "./Home";
import Lists from "./Lists";
import SignIn from "./SignIn";

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
  const { pathname } = useLocation();
  const isLoading = user === false;
  const isAuthenticated = !!user;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <>
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
            <Link component={RouterLink} to="/" underline="none">
              Cool Grocery List
            </Link>
          </Typography>
          {pathname !== "/sign-in" && (
            <AuthButton
              isAuthenticated={isAuthenticated}
              onSignOut={() => {
                setUser(null);
              }}
            />
          )}
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/sign-in">
            {isAuthenticated && <Redirect to="/lists" />}
            {!isAuthenticated && <SignIn />}
          </Route>
          <Route exact path="/lists">
            <Lists />
          </Route>
          <Route path="*">
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </Container>
    </>
  );
}
