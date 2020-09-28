import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { List, makeStyles } from "@material-ui/core";

import GroceryListItem from "./GroceryListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function GroceryLists() {
  const classes = useStyles();
  const [items, setItems] = useState([
    { name: "Cool List 1" },
    { name: "Cool List 2" },
    { name: "Cool List 3" },
    { name: "Cool List 4" },
  ]);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }

        setItems(reorder(items, result.source.index, result.destination.index));
      }}
    >
      <Droppable droppableId="droppable">
        {(provided) => (
          <List
            className={classes.root}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map(({ name }, index) => (
              <Draggable draggableId={name} index={index} key={name}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <GroceryListItem name={name} />
                  </div>
                )}
              </Draggable>
            ))}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}
