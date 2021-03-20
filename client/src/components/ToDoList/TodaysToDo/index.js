import React from "react";
import PropTypes from "prop-types";
import { CardActions, Fab, List, makeStyles } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ToDoItem from "../ToDoItem";

const useStyles = makeStyles({
    fab: {
        backgroundColor: "#30A0F5"
    },
    cardActions: {
        justifyContent: "flex-end"
    }
});

function TodaysToDo({ todaysDate, todoList, switchToAdd, toggleCheck, deleteItem, editItem }) {
    const classes = useStyles();

    return (
        <div>
            <List disablePadding>
                {
                    todoList.map((object, index) => (
                        <ToDoItem 
                            key={index}
                            checked={object.checked}
                            title={object.title}
                            time={object.time}
                            details={object.details}
                            onCheckboxClicked={() => toggleCheck(index, todaysDate)}
                            onDelete={() => deleteItem(index, todaysDate)}
                            onEdit={(field, newValue) => editItem(index, todaysDate, field, newValue)}
                        />
                    ))
                }
            </List>
            <CardActions className={classes.cardActions}>
                <Fab className={classes.fab} color="primary" size="medium" onClick={() => switchToAdd()}>
                    <AddIcon />
                </Fab>
            </CardActions>
        </div>
    );
}

TodaysToDo.propTypes = {
    todaysDate: PropTypes.string.isRequired,
    todoList: PropTypes.array.isRequired,
    switchToAdd: PropTypes.func.isRequired,
    toggleCheck: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired
};

export default TodaysToDo;