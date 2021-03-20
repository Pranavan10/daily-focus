import React, { useState } from "react";
import moment from "moment";
import { Card, CardHeader, MenuItem, Select, makeStyles } from "@material-ui/core";
import AddToDo from "./AddToDo";
import UpcomingToDo from "./UpcomingToDo";
import TodaysToDo from "./TodaysToDo";
import useTodosState from "./useTodosState";

const getUpcomingToDoItems = (currentToDoList, today) => {
    let upcomingToDoItems = {...currentToDoList};
    Object.keys(upcomingToDoItems).forEach(date => {
        if (!moment(date).isAfter(moment(today))) {
            delete upcomingToDoItems[date];
        }
    })
    return upcomingToDoItems;
};

const useStyles = makeStyles({
    container: {
        margin: "10px",
        width: "25%"
    },
    listContainer: {
        display: "flex",
        flexDirection: "column"
    },
    todoListTitle: {
        textAlign: "center",
        backgroundColor: "#30A0F5",
        marginBottom: "1.5vh"
    },
    todoListTitleSelect: {
        color: "white"
    },
});

const todaysDate = moment().format("YYYY-MM-D");

function ToDoList() {
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [selectedTimeline, setSelectedTimeline] = useState("today");

    const { todoList, addTodoItem, deleteTodoItem, editTodoItem, toggleCheck } = useTodosState({ [todaysDate]: [] }, setIsAddingItem);

    const classes = useStyles();

    return (
        <Card className={classes.container}>
            {
                isAddingItem ?
                    <AddToDo 
                        cancelClicked={() => setIsAddingItem(false)}
                        addClicked={addTodoItem}
                    /> : 
                    <div>
                        <CardHeader 
                            title={
                                <Select
                                    defaultValue={selectedTimeline} 
                                    classes={{ root: classes.todoListTitleSelect, icon: classes.todoListTitleSelect }}
                                    disableUnderline
                                    onChange={(e) => setSelectedTimeline(e.target.value)}
                                >
                                    <MenuItem value="today">Today</MenuItem>
                                    <MenuItem value="upcoming">Upcoming</MenuItem>
                                </Select>
                            }
                            className={classes.todoListTitle}
                        />
                        {
                            selectedTimeline === "upcoming" ?
                                <UpcomingToDo 
                                    upcomingToDoList={getUpcomingToDoItems(todoList, todaysDate)}
                                    switchToAdd={() => setIsAddingItem(true)}
                                    toggleCheck={toggleCheck}
                                    deleteItem={deleteTodoItem}
                                    editItem={editTodoItem}
                                /> :
                                <TodaysToDo 
                                    todoList={todoList[todaysDate]}
                                    switchToAdd={() => setIsAddingItem(true)}
                                    todaysDate={todaysDate}
                                    toggleCheck={toggleCheck}
                                    deleteItem={deleteTodoItem}
                                    editItem={editTodoItem}
                                />
                        }
                    </div>
            }
        </Card>
    );
}

export default ToDoList;
