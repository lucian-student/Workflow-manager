import React, { useState } from 'react'
import { DropdownProps } from '../../hooks/useDropdownMenu';
import projectViewStyles from './ProjectView/ProjectView.module.css';
import ProjectData from './ProjectData';
import ProjectEditForm from './ProjectEditForm';
import { ImCancelCircle } from 'react-icons/im';


interface Props {
    modal: DropdownProps
}

function ProjectView({ modal: { setOpen, open, menuRef } }: Props): JSX.Element {

    const [editing, setEditing] = useState(false);

    return (
        <div className={open ? projectViewStyles.modal_bg : projectViewStyles.hide_modal}>
            <div ref={menuRef} className={projectViewStyles.modal}>
                <ImCancelCircle className={projectViewStyles.cancel_modal}
                    onClick={() => setOpen(false)} />
                
                <div className={projectViewStyles.content}>
                    {editing ? (
                        <ProjectEditForm />
                    ) : (
                        <ProjectData />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectView;