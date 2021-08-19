import React from "react";
import withAuth from '../components/hoc/withAuth';
import Background from "../components/Layout/Background";
import mainStyles from '../pageUtils/Main/Main.module.css';
import OptionsBar from "../components/MainAndTeamPage/OptionsBar";
import ProjectDisplay from "../components/MainAndTeamPage/ProjectDisplay";
import ProjectForm from "../components/MainAndTeamPage/ProjectForm";
import { SortContextProvider } from '../context/sort';

function Main() {
    return (
        <div className={mainStyles.main_wrapper}>
            <Background />
            <SortContextProvider type='project'>
                <div className={mainStyles.content}>
                    <OptionsBar team={false} type='project'/>
                    <div className={mainStyles.projects_wrapper}>
                        <ProjectForm team_id={null}/>
                        <ProjectDisplay team_id={null}/>
                    </div>
                </div>
            </SortContextProvider>
        </div>
    )
}


export default withAuth(Main);