import React, { useState, useContext, Fragment } from 'react'
import { DropdownProps } from '../../hooks/useDropdownMenu';
import projectViewStyles from './ProjectView/ProjectView.module.css';
import ProjectData from './ProjectData';
import ProjectEditForm from './ProjectEditForm';
import { ImCancelCircle } from 'react-icons/im';
import { AiOutlineEdit } from 'react-icons/ai';
import { ProjectContext } from '../../context/project';

interface Props {
    modal: DropdownProps
}

function ProjectView({ modal: { setOpen, open, menuRef } }: Props): JSX.Element {

    const [editing, setEditing] = useState<boolean>(false);

    const { role } = useContext(ProjectContext);

    return (
        <div className={open ? projectViewStyles.modal_bg : projectViewStyles.hide_modal}>
            <div ref={menuRef} className={projectViewStyles.modal}>
                <ImCancelCircle className={projectViewStyles.cancel_modal}
                    onClick={() => setOpen(false)} />
                {!role ? (
                    <button className={projectViewStyles.toggle_button}
                        onClick={() => setEditing(old => !old)}>
                        <AiOutlineEdit className={projectViewStyles.icon} />
                    </button>
                ) : (
                    <Fragment>
                        {role <= 2 && (
                            <button className={projectViewStyles.toggle_button}
                                onClick={() => setEditing(old => !old)}>
                                <AiOutlineEdit className={projectViewStyles.icon} />
                            </button>
                        )}
                    </Fragment>
                )}
                <div className={projectViewStyles.content}>
                    {!editing ? (
                        <ProjectData />
                    ) : (
                        <ProjectEditForm setEditing={setEditing} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectView;