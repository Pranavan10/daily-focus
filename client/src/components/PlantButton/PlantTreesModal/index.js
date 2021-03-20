import React, { useState } from "react";
import Plant from "./Plant";
import ControlButton from "./ControlButton";
import UserFeedback from "./UserFeedback";
import stateUtils from "../stateUtils";

import styles from "./style.module.scss";

function PlantTreesModal() {
    const [config, setConfig] = useState({
        plantSize: 0, //This var shows different trees pictures
        points: 0, //This var control the progressbar
        waterCoins: 20, // when the user complete one task they get some waterCoins, which can be used to water trees
        feedback: stateUtils.feedback.start,
    });
    const POINTS = {
        SEEDLING: 10, //small trees
        SMALL: 20, //medium trees
        FULL_GROWN: 50, // big trees
    };

    const handlePlantGrowth = () => {
        var coins = config.waterCoins;
        if (coins > 0) {
            var newPoints = config.points++;
            coins = coins - 1;
            setConfig({ ...config, points: newPoints });
            setConfig({ ...config, waterCoins: coins });
            if (newPoints >= POINTS.FULL_GROWN) {
                setConfig({
                    ...config,
                    plantSize: 3,
                    waterCoins: coins,
                    feedback: stateUtils.feedback.win,
                }); //Change to the big trees pictures
            } else if (newPoints >= POINTS.SMALL) {
                setConfig({ ...config, plantSize: 2, waterCoins: coins }); //Change to the medium trees pictures
            } else if (newPoints >= POINTS.SEEDLING) {
                setConfig({ ...config, plantSize: 1, waterCoins: coins }); //Change to the small trees pictures
            }
        } else {
            coins = 0;
            setConfig({ ...config, buttonState: false, feedback: stateUtils.feedback.noCoin });
        }
    };
    //show the progressbar
    const getProgress = () => {
        const progress = Math.round((config.points / POINTS.FULL_GROWN) * 100);
        return progress < 100 ? progress : 100;
    };

    return (
        <div className={styles.app}>
            <div className={styles.appHeader}>Grow your plant</div>

            <div>
                {" "}
                {/* plant display */}
                <Plant plantImage={stateUtils.plantImageUrls[config.plantSize]}></Plant>
                {/* control buttons */}
                <ControlButton
                    control={stateUtils.controls.water}
                    points={1}
                    handlePlantGrowth={handlePlantGrowth}
                    image={stateUtils.buttonImageUrls.water}
                />
                <UserFeedback feedbackText={config.feedback} progress={getProgress()} />
                <div></div>
            </div>
        </div>
    );
}

export default PlantTreesModal;
