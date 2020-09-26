import React from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Lists() {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <ListItem button dense>
        <ListItemText primary="Cool list 1" />
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <ArrowForwardIosIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button dense>
        <ListItemText primary="Cool list 2" />
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <ArrowForwardIosIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button dense>
        <ListItemText primary="Cool list 3" />
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <ArrowForwardIosIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button dense>
        <ListItemText primary="Cool list 4" />
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <ArrowForwardIosIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
