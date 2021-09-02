import React, { useContext, useEffect } from "react";
import { useRouter } from 'next/router';
import { BsThreeDots } from 'react-icons/bs';
import projectOptionsStyles from './ProjectOptions/ProjectOptions.module.css';
import { useDropDownMenu } from "../../hooks/useDropdownMenu";
import ProjectView from "./ProjectView";
import { ProjectContext } from '../../context/project';
import { Fragment } from "react";
import { useDeleteProjectMutation } from '../../generated/apolloComponents';

function ProjectOptions(): JSX.Element {

    const { open, setOpen, menuRef } = useDropDownMenu();

    const router = useRouter();

    const modal = useDropDownMenu();

    const { role, project } = useContext(ProjectContext);

    const [deleteProjectMutation, { data }] = useDeleteProjectMutation({
        variables: {
            project_id: Number(project.project_id),
            team_id: Number(project.team_id)
        },
        onError(err) {
            console.log(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            if (!project.team_id) {
                router.replace('/main');
            }
        }
    }, [data, project.team_id]);

    function handleDelete() {
        deleteProjectMutation();
    }

    return (
        <div className={projectOptionsStyles.project_options_wrapper}>
            <div ref={menuRef}>
                <button className={projectOptionsStyles.toggle_button}
                    onClick={() => setOpen(old => !old)}>
                    <BsThreeDots className={projectOptionsStyles.icon} />
                </button>
                {open && (
                    <div className={projectOptionsStyles.menu}>
                        <button className={projectOptionsStyles.menu_item}
                            onClick={() => { modal.setOpen(true); setOpen(false); }}>
                            View project
                        </button>
                        {!role ? (
                            <button className={projectOptionsStyles.menu_item}
                                onClick={handleDelete}>
                                Delete project
                            </button>
                        ) : (
                            <Fragment>
                                {role === 1 && (
                                    <button className={projectOptionsStyles.menu_item}
                                        onClick={handleDelete}>
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