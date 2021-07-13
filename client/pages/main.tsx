import React from "react";
import withAuth from '../components/hoc/withAuth';
import Background from "../components/Layout/Background";
import mainStyles from '../pageUtils/Main/Main.module.css';
import OptionsBar from "../components/Main/OptionsBar";
import ProjectDisplay from "../components/Main/ProjectDisplay";
import ProjectForm from "../components/Main/ProjectForm";

function Main() {
    return (
        <div className={mainStyles.main_wrapper}>
            <Background />
            <div className={mainStyles.content}>
                <OptionsBar />
                <div className={mainStyles.projects_wrapper}>
                    <ProjectForm />
                    <ProjectDisplay />
                </div>
            </div>
        </div>
    )
}


export default withAuth(Main);