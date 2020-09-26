import React from "react";
import {
  IconButton,
  ListItem as ListItemContainer,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function ListItem() {
  return (
    <ListItemContainer button dense>
      <ListItemText primary="Cool list 1" />
      <ListItemSecondaryAction>
        <IconButton edge="end">
          <ArrowForwardIosIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItemContainer>
  );
}
