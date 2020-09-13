import { Container, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import React, { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  useEffect(() => {
    const authUI = new firebaseui.auth.AuthUI(firebase.auth());
    authUI.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: function () {
          return false;
        },
      },
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    });

    return () => {
      authUI.delete();
    };
  }, []);

  return (
    <Container className={classes.container} component="main" maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography align="center" component="h1" variant="h4">
          Sign In / Up
        </Typography>
        <div id="firebaseui-auth-container" />
      </Paper>
    </Container>
  );
}
