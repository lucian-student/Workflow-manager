import React from "react";
import { BsThreeDots } from 'react-icons/bs';
import projectOptionsStyles from './ProjectOptions/ProjectOptions.module.css';

function ProjectOptions(): JSX.Element {

    return (
        <div>
            <button className={projectOptionsStyles.toggle_button}>
                <BsThreeDots className={projectOptionsStyles.icon} />
            </button>
        </div>
    )
}

export default ProjectOptions;