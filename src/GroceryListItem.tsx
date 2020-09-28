import React from "react";
import {
  IconButton,
  ListItem as ListItemContainer,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export interface GroceryListItemProps {
  name: string;
}

export default function GroceryListItem(props: GroceryListItemProps) {
  const { name } = props;
  return (
    <ListItemContainer button dense>
      <ListItemText primary={name} />
      <ListItemSecondaryAction>
        <IconButton edge="end">
          <ArrowForwardIosIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItemContainer>
  );
}
