import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { IconButton, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import styles from "./style.module.scss";
import GoogleLogo from "../../images/google-icon.svg";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    searchLabel: {
        fontFamily: "'Ropa Sans', sans-serif",
        fontSize: "1.5rem",
        margin: "5px 10px",
        color: "#7D7D7D",
    },
    searchIcon: {},
    searchBar: {
        borderRadius: "20px",
    },
});

function SearchBar() {
    const classes = useStyles();

    return (
        <Paper
            classes={{ root: classes.searchBar }}
            component="form"
            action="https://www.google.co.nz/search"
            method="get"
            target="_blank"
            elevation={3}
        >
            <div className={styles.container}>
                <img className={styles.googleLogo} src={GoogleLogo} alt="Google" />
                <InputBase
                    classes={{ root: classes.root, input: classes.searchLabel }}
                    placeholder="Google Search"
                    inputComponent="input"
                    inputProps={{
                        "aria-label": "search google",
                        "type": "search",
                        "name": "query",
                    }}
                />
                <IconButton
                    classes={{ root: classes.searchIcon }}
                    type="submit"
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </div>
        </Paper>
    );
}

export default SearchBar;
