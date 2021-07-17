import React from "react";
import { VscAdd } from 'react-icons/vsc';
import projectFormStyles from './ProjectForm/ProjectForm.module.css';

function ProjectForm(): JSX.Element {

    return (
        <div>
            <VscAdd className={projectFormStyles.add_icon}/>
        </div>
    )
}

export default ProjectForm;