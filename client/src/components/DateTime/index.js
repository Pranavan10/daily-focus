import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

function DateTime() {
    const [dateObject, setDateObject] = useState(new Date());

    useEffect(() => {
        const interval = setTimeout(() => setDateObject(new Date(), 1000 * 60));
        return () => clearTimeout(interval);
    }, [dateObject]);

    const time = dateObject.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let day = dayArray[dateObject.getDay()];
    let date = dateObject.getDate();
    let month = monthArray[dateObject.getMonth()];

    return <div className={styles.text}>{` ${time} | ${day} ${date} ${month}`}</div>;
}

export default DateTime;
