import React from "react";
import styles from "./style.module.scss";

function ControlButton({ control, points, handlePlantGrowth, image }) {
    return (
        <button className={styles.button}>
            <img
                src={image}
                alt={control}
                points={points}
                onClick={handlePlantGrowth}
                className={styles.image}
            />
        </button>
    );
}

export default ControlButton;
