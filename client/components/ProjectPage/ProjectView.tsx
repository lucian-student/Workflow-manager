import React, { useState } from 'react'
import { DropdownProps } from '../../hooks/useDropdownMenu';
import projectViewStyles from './ProjectView/ProjectView.module.css';
import ProjectData from './ProjectData';
import ProjectEditForm from './ProjectEditForm';
import { ImCancelCircle } from 'react-icons/im';
import { AiOutlineEdit } from 'react-icons/ai';

interface Props {
    modal: DropdownProps
}

function ProjectView({ modal: { setOpen, open, menuRef } }: Props): JSX.Element {

    const [editing, setEditing] = useState<boolean>(false);

    return (
        <div className={open ? projectViewStyles.modal_bg : projectViewStyles.hide_modal}>
            <div ref={menuRef} className={projectViewStyles.modal}>
                <ImCancelCircle className={projectViewStyles.cancel_modal}
                    onClick={() => setOpen(false)} />
                <button className={projectViewStyles.toggle_button}
                    onClick={() => setEditing(old => !old)}>
                    <AiOutlineEdit className={projectViewStyles.icon} />
                </button>
                <div className={projectViewStyles.content}>
                    {!editing ? (
                        <ProjectData />
                    ) : (
                        <ProjectEditForm />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectView;