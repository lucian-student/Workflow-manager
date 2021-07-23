import React, { useContext, useEffect } from 'react';
import { ProjectContext } from '../../context/project';
import projectDataStyles from './ProjectData/ProjectData.module.css';
import { GiProgression } from 'react-icons/gi';
import { MdDateRange, MdSubtitles, MdDescription } from 'react-icons/md'
import dayjs from 'dayjs';
import TextareaAutosize from 'react-textarea-autosize';
import { useDropDownMenu } from '../../hooks/useDropdownMenu';
import { MenuContext } from '../../context/menu';
import { ImCancelCircle } from 'react-icons/im';
import { useForm } from 'react-hook-form';

function ProjectData(): JSX.Element {

    const { project } = useContext(ProjectContext);
    const { setEditing } = useContext(MenuContext);

    const descHiddenForm = useDropDownMenu();
    const nameHiddenForm = useDropDownMenu();
    const statusHiddenForm = useDropDownMenu();
    const deadlineHiddenForm = useDropDownMenu();

    const descForm = useForm();
    const nameForm = useForm();
    const statusform = useForm();
    const deadlineForm = useForm();

    useEffect(() => {
        if (
            nameHiddenForm.open ||
            descHiddenForm.open ||
            statusHiddenForm.open ||
            deadlineHiddenForm.open
        ) {
            setEditing(true)
        } else {
            setEditing(false);
        }
    }, [
        nameHiddenForm.open,
        descHiddenForm.open,
        statusHiddenForm.open,
        deadlineHiddenForm.open
    ]);

    return (
        <div className={projectDataStyles.project_data_wrapper}>
            <form className={projectDataStyles.form}>
                <MdSubtitles className={projectDataStyles.display_icon}/>
                {!nameHiddenForm.open && (
                    <div className={projectDataStyles.text}
                        onClick={() => nameHiddenForm.setOpen(true)}>
                        <div>
                            {project.name}
                        </div>
                    </div>
                )}
                <div ref={nameHiddenForm.menuRef}>
                    {nameHiddenForm.open && (
                        <div>
                            <input
                                className={projectDataStyles.input}
                                type='text'
                                defaultValue={project.name} />
                            <div className={projectDataStyles.form_actions}>
                                <button type='submit'
                                    className={projectDataStyles.submit_button}>
                                    Save
                                </button>
                                <ImCancelCircle className={projectDataStyles.cancel_icon}
                                    onClick={() => { nameHiddenForm.setOpen(false) }} />
                            </div>
                        </div>
                    )}
                </div>
            </form>
            <form className={projectDataStyles.form}>
                <GiProgression className={projectDataStyles.display_icon}/>
                {!statusHiddenForm.open && (
                    <div className={projectDataStyles.text}
                        onClick={() => statusHiddenForm.setOpen(true)}>
                        <div>
                            {`Status: ${project.status}`}
                        </div>
                    </div>
                )}
                <div ref={statusHiddenForm.menuRef}>
                    {statusHiddenForm.open && (
                        <div>
                            <input
                                className={projectDataStyles.input}
                                type='text'
                                defaultValue={project.status} />
                            <div className={projectDataStyles.form_actions}>
                                <button
                                    type='submit'
                                    className={projectDataStyles.submit_button}>
                                    Save
                                </button>
                                <ImCancelCircle className={projectDataStyles.cancel_icon}
                                    onClick={() => { statusHiddenForm.setOpen(false) }} />
                            </div>
                        </div>
                    )}
                </div>
            </form>
            <form className={projectDataStyles.form}>
                <MdDateRange className={projectDataStyles.display_icon}/>
                {!deadlineHiddenForm.open && (
                    <div className={projectDataStyles.text}
                        onClick={() => deadlineHiddenForm.setOpen(true)}>
                        <div>
                            {`Deadline: ${dayjs(project.deadline).format('DD/MM/YYYY')}`}
                        </div>
                    </div>
                )}
                <div ref={deadlineHiddenForm.menuRef}>
                    {deadlineHiddenForm.open && (
                        <div>
                            <input
                                className={projectDataStyles.input}
                                type='date'
                                defaultValue={project.deadline} />
                            <div className={projectDataStyles.form_actions} >
                                <button type='submit'
                                    className={projectDataStyles.submit_button}>
                                    Save
                                </button>
                                <ImCancelCircle className={projectDataStyles.cancel_icon}
                                    onClick={() => { deadlineHiddenForm.setOpen(false) }} />
                            </div>
                        </div>
                    )}
                </div>
            </form>
            <form onSubmit={() => { }}
                className={projectDataStyles.form}>
                <MdDescription className={projectDataStyles.display_icon}/>
                {!descHiddenForm.open && (
                    <p className={projectDataStyles.description}
                        onClick={() => descHiddenForm.setOpen(true)}>
                        {project.description}
                    </p>
                )}
                <div ref={descHiddenForm.menuRef}>
                    {descHiddenForm.open && (
                        <div>
                            <TextareaAutosize
                                className={[projectDataStyles.input, projectDataStyles.textarea].join(' ')}
                                name='description'
                                placeholder='Enter descipription...'
                                defaultValue={project.description} />
                            <div className={projectDataStyles.form_actions}>
                                <button type='submit'
                                    className={projectDataStyles.submit_button}>
                                    Save
                                </button>
                                <ImCancelCircle className={projectDataStyles.cancel_icon}
                                    onClick={() => { descHiddenForm.setOpen(false) }} />
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default ProjectData;
