import React from "react";
import withAuth from '../components/hoc/withAuth';
import Background from "../components/Layout/Background";
import mainStyles from '../pageUtils/Main/Main.module.css';
import OptionsBar from "../components/Main/OptionsBar";

function Main() {
    return (
        <div className={mainStyles.main_wrapper}>
            <Background />
            <OptionsBar />
        </div>
    )
}


export default withAuth(Main);