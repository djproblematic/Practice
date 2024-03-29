import React from "react";
import styles from './assets/navigationButton.module.css';

const NextButton = () => {
    return (
        <button className={styles.navigationButtonRight}>
            <span className={styles.navigationText} color="green">
                ❯
            </span>
        </button>
    );
}

export default NextButton;