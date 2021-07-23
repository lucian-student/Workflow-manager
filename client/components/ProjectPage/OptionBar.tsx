import React from "react";
import { Project } from "../../generated/apolloComponents";
import optionBarStyles from './OptionBar/OptionBar.module.css';
import ProjectOptions from './ProjectOptions';
import { MenuContextProvider } from '../../context/menu';

interface Props {
    project: Project
}

function OptionBar({ project }: Props): JSX.Element {

    return (
        <div className={optionBarStyles.option_bar_wrapper}>
            <div className={optionBarStyles.project_name}>
                {project.name}
            </div>
            <MenuContextProvider>
                <ProjectOptions />
            </MenuContextProvider>
        </div>
    )
}

export default OptionBar;