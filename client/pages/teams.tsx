import React, { useState, Fragment } from "react";
import withAuth from "../components/hoc/withAuth";
import Background from "../components/Layout/Background";
import teamStyles from '../pageUtils/Team/Team.module.css';
import TeamDisplay from "../components/Team/TeamDisplay";
import TeamForm from "../components/Team/TeamForm";
import NavBar from "../components/Team/NavBar";
import InveitsDisplay from "../components/Team/InveitsDisplay";

function Teams(): JSX.Element {

    const [route, setRoute] = useState<'teams' | 'inveits'>('teams');

    return (
        <div className={teamStyles.page_wrapper}>
            <Background />
            <div className={teamStyles.content_wrapper}>
                <NavBar route={route} setRoute={setRoute} />
                {route === 'teams' ? (
                    <Fragment>
                        <TeamForm />
                        <TeamDisplay />
                    </Fragment>
                ) : route === 'inveits' && (
                    <InveitsDisplay />
                )}
            </div>
        </div>
    )
}

export default withAuth(Teams);