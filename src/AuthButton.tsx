import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as firebase from "firebase";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

interface AuthButtonProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
}

export default function AuthButton(props: AuthButtonProps) {
  const classes = useStyles();
  const { isAuthenticated, onSignOut } = props;
  const history = useHistory();

  return (
    <Button
      className={classes.link}
      color="primary"
      href="#"
      onClick={async () => {
        if (isAuthenticated) {
          await firebase.auth().signOut();
          onSignOut();
        } else {
          history.push("/sign-in");
        }
      }}
      variant="outlined"
    >
      {isAuthenticated ? "Sign Out" : "Sign In"}
    </Button>
  );
}
