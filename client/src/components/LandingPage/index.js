import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";

import FocusLogo from "../../images/focus-logo.svg";
import styles from "./style.module.scss";

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root": {
            borderRadius: 15,
        },
        "& .MuiInputLabel-root": {
            fontSize: "1.25rem",
            color: "#7D7D7D",
            fontFamily: "'Ropa Sans', sans-serif",
        },
    },
    buttonRoot: {
        background: "#30A0F5",
        borderRadius: 50,
        padding: "4px 25px",
        width: "100%",
    },
    label: {
        textTransform: "capitalize",
        fontFamily: "'Ropa Sans', sans-serif",
        fontSize: "1.75rem",
    },
});

export default function LandingPage() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.focusIntro}>
                    <img className={styles.focusLogo} src={FocusLogo} alt="FOCUS" />
                    <p>
                        Daily Focus is a dashboard web app that surfaces vital at-a-glance
                        information to enable you to know what you need to know and get on with your
                        day.
                    </p>
                </div>
                <div className={styles.signUpContainer}>
                    <h1>Create new account!</h1>

                    <TextField
                        style={{ paddingBottom: 20 }}
                        classes={{ root: classes.root }}
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                        label="Email address"
                    />

                    <TextField
                        style={{ paddingBottom: 20 }}
                        classes={{ root: classes.root }}
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                        label="Password"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        classes={{ root: classes.buttonRoot, label: classes.label }}
                        onClick={() => history.push("/home")}
                    >
                        Sign Up
                    </Button>

                    <Link to="/login">Already have an account? Sign in</Link>
                </div>
            </div>
        </div>
    );
}
