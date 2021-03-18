import React from "react";

import styles from "./style.module.scss";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

function SearchBar() {
    return (
        <Paper
            component="form"
            action="https://www.google.co.nz/search"
            method="get"
            target="_blank"
        >
            <div className={styles.container}>
                <InputBase
                    className={styles.input}
                    placeholder="Search Google"
                    inputComponent="input"
                    inputProps={{
                        "aria-label": "search google",
                        "type": "search",
                        "name": "query",
                    }}
                />
                <IconButton className={styles.iconButton} type="submit" aria-label="search">
                    <SearchIcon />
                </IconButton>
            </div>
        </Paper>
    );
}

export default SearchBar;
