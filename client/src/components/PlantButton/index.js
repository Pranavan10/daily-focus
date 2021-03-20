import React from "react";
import ReactModal from "react-modal";
import PlantTreesModal from "./PlantTreesModal";

import styles from "./style.module.scss";

function PlantButton() {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <div className={styles.app}>
            <button onClick={() => setShowModal(true)} className={styles.plantButton}>
                Plant
            </button>
            <ReactModal isOpen={showModal} contentLabel="model" ariaHideApp={false}>
                <PlantTreesModal />
                <button onClick={() => setShowModal(false)} className={styles.plantButton}>
                    Close
                </button>
            </ReactModal>
        </div>
    );
}

export default PlantButton;
