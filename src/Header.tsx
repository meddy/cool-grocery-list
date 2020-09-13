import {
  AppBar,
  Button,
  Link,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import firebase from "firebase/app";
import React from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(2),
  },
  appName: {
    flexGrow: 1,
  },
  navItem: {
    margin: theme.spacing(1, 1.5),
  },
}));

interface HeaderProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
}

export default function Header(props: HeaderProps) {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  const { isAuthenticated, onSignOut } = props;

  return (
    <AppBar className={classes.header} position="static">
      <Toolbar>
        <Typography className={classes.appName} noWrap variant="h5">
          <Link
            color="textPrimary"
            component={RouterLink}
            to="/"
            underline="none"
          >
            Cool Grocery List
          </Link>
        </Typography>
        <nav>
          <Link
            className={classes.navItem}
            color="textPrimary"
            component={RouterLink}
            to="/lists"
            variant="button"
          >
            Lists
          </Link>
        </nav>
        {pathname !== "/sign-in" && (
          <Button
            className={classes.navItem}
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
        )}
      </Toolbar>
    </AppBar>
  );
}
