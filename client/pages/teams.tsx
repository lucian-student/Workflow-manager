import React from "react";
import withAuth from "../components/hoc/withAuth";
import Background from "../components/Layout/Background";
import teamStyles from '../pageUtils/Team/Team.module.css';

function Teams(): JSX.Element {
    return (
        <div className={teamStyles.page_wrapper}>
            <Background />
        </div>
    )
}

export default withAuth(Teams);