import React from "react";
import backgroundStyles from './Background/Background.module.css';



function Background(): JSX.Element {
    return (
        <div className={backgroundStyles.background}>
            <div className={backgroundStyles.background_left} />
            <div className={backgroundStyles.empty_stripe} />
            <div className={backgroundStyles.background_right} />
        </div>
    )
}

export default Background;