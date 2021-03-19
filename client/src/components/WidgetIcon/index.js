import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import styles from "./style.module.scss";

function WidgetIcon({ image, label, selectedWidgets, setSelectedWidgets }) {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (selected) {
            setSelectedWidgets([...selectedWidgets, label]);
        } else {
            setSelectedWidgets(
                selectedWidgets.filter((selectedWidget) => selectedWidget !== label)
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    return (
        <Grid item xs={6}>
            <Card
                className={`${styles.card} ${selected && styles.selectedCard}`}
                onClick={() => setSelected(!selected)}
                raised
            >
                <img src={image} className={styles.media} alt={label} />
                <CardContent className={styles.cardContent}>{label}</CardContent>
            </Card>
        </Grid>
    );
}

export default WidgetIcon;
