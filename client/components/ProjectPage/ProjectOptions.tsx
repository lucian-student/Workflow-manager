import React, { useContext } from "react";
import { BsThreeDots } from 'react-icons/bs';
import projectOptionsStyles from './ProjectOptions/ProjectOptions.module.css';
import { useDropDownMenu } from "../../hooks/useDropdownMenu";
import ProjectView from "./ProjectView";
import { ProjectContext } from '../../context/project';
import { Fragment } from "react";

function ProjectOptions(): JSX.Element {

    const { open, setOpen, menuRef } = useDropDownMenu();

    const modal = useDropDownMenu();

    const { role } = useContext(ProjectContext);

    return (
        <div className={projectOptionsStyles.project_options_wrapper}>
            <div  ref={menuRef}>
                <button className={projectOptionsStyles.toggle_button}
                    onClick={() => setOpen(old => !old)}>
                    <BsThreeDots className={projectOptionsStyles.icon} />
                </button>
                {open && (
                    <div className={projectOptionsStyles.menu}>
                        <button className={projectOptionsStyles.menu_item}
                            onClick={() => { modal.setOpen(true); setOpen(false);}}>
                            View project
                        </button>
                        {!role ? (
                            <button className={projectOptionsStyles.menu_item}>
                                Delete project
                            </button>
                        ) : (
                            <Fragment>
                                {role === 1 && (
                                    <button className={projectOptionsStyles.menu_item}>
                                        Delete project
                                    </button>
                                )}
                            </Fragment>
                        )}
                    </div>
                )}
            </div>
            <ProjectView modal={modal} />
        </div >
    )
}

export default ProjectOptions;