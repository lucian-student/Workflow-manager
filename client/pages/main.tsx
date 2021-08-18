import React from "react";
import withAuth from '../components/hoc/withAuth';
import Background from "../components/Layout/Background";
import mainStyles from '../pageUtils/Main/Main.module.css';
import OptionsBar from "../components/MainAndTeamPage/OptionsBar";
import ProjectDisplay from "../components/MainAndTeamPage/ProjectDisplay";
import ProjectForm from "../components/MainAndTeamPage/ProjectForm";
import { ProjectSortContextProvider } from '../context/projectSort';

function Main() {
    return (
        <div className={mainStyles.main_wrapper}>
            <Background />
            <ProjectSortContextProvider>
                <div className={mainStyles.content}>
                    <OptionsBar team={false}/>
                    <div className={mainStyles.projects_wrapper}>
                        <ProjectForm team_id={null}/>
                        <ProjectDisplay team_id={null}/>
                    </div>
                </div>
            </ProjectSortContextProvider>
        </div>
    )
}


export default withAuth(Main);