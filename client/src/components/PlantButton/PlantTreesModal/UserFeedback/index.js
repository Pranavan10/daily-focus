import React from "react";
import styles from "./style.module.scss";

function UserFeedback({ feedbackText, progress }) {
    return (
        <div className={styles.userFeedback}>
            <progress className={styles.progressBar} value={progress / 100} />
            <h4>Progress: {progress}% grown</h4>
            {feedbackText}
        </div>
    );
}

export default UserFeedback;
