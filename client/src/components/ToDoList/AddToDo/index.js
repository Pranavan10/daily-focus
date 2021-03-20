import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Button, CardActions, CardHeader, TextField, makeStyles } from "@material-ui/core";
import styles from "./style.module.scss";

const useStyles = makeStyles({
    todoListTitle: {
        textAlign: "center",
        backgroundColor: "#30A0F5",
        color: "white",
        marginBottom: "1.5vh",
        paddingTop: "2.3vh",
        paddingBottom: "2.3vh"
    },
    todoInputTextField: {
        [`& fieldset`]: {
            borderRadius: "40px"
        }
    },
    primaryButton: {
        backgroundColor: "#30A0F5",
        color: "white",
        borderRadius: "20px" 
    },
    cardActions: {
        justifyContent: "flex-end"
    },
    cancelButton: {
        backgroundColor: "white",
        color: "black",
        borderColor: "#30A0F5",
        borderRadius: "20px"
    }
});

function AddToDo({ cancelClicked, addClicked }) {
    const currentDate = moment().format("YYYY-MM-D");
    const currentTime = moment().format("HH:mm");

    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [selectedTime, setSelectedTime] = useState(currentTime);
    const [currentTitle, setCurrentTitle] = useState("");
    const [currentDetails, setCurrentDetails] = useState("");

    const classes = useStyles();

    return (
        <div>
            <CardHeader 
                title="Add Task"
                className={classes.todoListTitle}
                disableTypography
            />
            <form>
                <div className={styles.todoAddField}>
                    <TextField
                        className={classes.todoInputTextField}
                        fullWidth
                        variant="outlined" 
                        type="date"
                        label="Date"
                        defaultValue={currentDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>
                <div className={styles.todoAddField}>
                    <TextField 
                        fullWidth
                        className={classes.todoInputTextField}
                        variant="outlined"
                        type="time"
                        label="Time"
                        defaultValue={currentTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                    />
                </div>
                <div className={styles.todoAddField}>
                    <TextField 
                        fullWidth
                        className={classes.todoInputTextField}
                        variant="outlined"
                        label="Title" 
                        onChange={(e) => setCurrentTitle(e.target.value)}
                    />
                </div>
                <div className={styles.todoAddField}>
                    <TextField
                        fullWidth
                        className={classes.todoInputTextField}
                        variant="outlined"
                        label="Details"
                        onChange={(e) => setCurrentDetails(e.target.value)} 
                        multiline 
                    />
                </div>
        
            </form>
            <CardActions className={classes.cardActions}>
                <Button 
                    className={classes.primaryButton}
                    color="primary" 
                    variant="contained" 
                    onClick={() => addClicked(selectedDate, selectedTime, currentTitle, currentDetails)}
                >
                    Add Task
                </Button>
                <Button className={classes.cancelButton} variant="outlined" onClick={cancelClicked}>
                    Cancel
                </Button>
            </CardActions>
        </div>
    );
}

AddToDo.propTypes = {
    cancelClicked: PropTypes.func.isRequired,
    addClicked: PropTypes.func.isRequired
};

export default AddToDo;