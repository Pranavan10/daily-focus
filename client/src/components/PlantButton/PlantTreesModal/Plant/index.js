import React from "react";

import styles from "./style.module.scss";

function Plant({ plantImage }) {
    return (
        <div className={styles.plantContainer}>
            <img className={styles.plantImage} alt={plantImage} src={plantImage}></img>
        </div>
    );
}

export default Plant;
