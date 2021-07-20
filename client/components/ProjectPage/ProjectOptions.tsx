import React from "react";
import { BsThreeDots } from 'react-icons/bs';
import projectOptionsStyles from './ProjectOptions/ProjectOptions.module.css';
import { useDropDownMenu } from "../../hooks/useDropdownMenu";

function ProjectOptions(): JSX.Element {

    const { open, setOpen, menuRef } = useDropDownMenu();

    return (
        <div className={projectOptionsStyles.project_options_wrapper} ref={menuRef}>
            <button className={projectOptionsStyles.toggle_button}
                onClick={() => setOpen(old => !old)}>
                <BsThreeDots className={projectOptionsStyles.icon} />
            </button>
            {open && (
                <div className={projectOptionsStyles.menu}>
                    <button className={projectOptionsStyles.menu_item}>
                        Edit project
                    </button>
                    <button className={projectOptionsStyles.menu_item}>
                        Delete project
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProjectOptions;