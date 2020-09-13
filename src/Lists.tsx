import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Lists() {
  const classes = useStyles();
  return (
    <List className={classes.root} component="nav">
      <ListItem button>
        <ListItemIcon>
          <Checkbox disableRipple edge="start" />
        </ListItemIcon>
        <ListItemText primary="Cool thing 1" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Checkbox disableRipple edge="start" />
        </ListItemIcon>
        <ListItemText primary="Cool thing 2" />
      </ListItem>
    </List>
  );
}
