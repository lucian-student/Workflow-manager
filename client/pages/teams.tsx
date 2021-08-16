import React from "react";
import withAuth from "../components/hoc/withAuth";
import Background from "../components/Layout/Background";
import teamStyles from '../pageUtils/Team/Team.module.css';
import TeamDisplay from "../components/Team/TeamDisplay";
import TeamForm from "../components/Team/TeamForm";

function Teams(): JSX.Element {



    return (
        <div className={teamStyles.page_wrapper}>
            <Background />
            <div className={teamStyles.content_wrapper}>
                <TeamForm />
                <TeamDisplay />
            </div>
        </div>
    )
}

export default withAuth(Teams);