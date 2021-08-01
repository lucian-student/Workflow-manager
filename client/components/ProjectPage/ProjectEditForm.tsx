import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import projectEditFormStyles from './ProjectEditForm/ProjectEditForm.module.css';
import { ProjectContext } from '../../context/project';
import TextareaAutosize from 'react-textarea-autosize';
import { GiProgression } from 'react-icons/gi';
import { MdDateRange, MdSubtitles, MdDescription } from 'react-icons/md'
import dayjs from 'dayjs';
import { EditProjectInput, useEditProjectMutation } from '../../generated/apolloComponents';
import update from 'immutability-helper';
import { getProjectQuery } from '../../graphql/project/query/getProject';

interface Props {
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

function ProjectEditForm({ setEditing }): JSX.Element {

    const { project } = useContext(ProjectContext);

    const { handleSubmit, formState: { errors }, register } = useForm();

    const [editProjectMutation, { data }] = useEditProjectMutation({
        onError(err) {
            console.log(err.message);
        },
        update(proxy, result) {
            const data = proxy.readQuery({
                query: getProjectQuery,
                variables: {
                    project_id: Number(project.project_id),
                    team_id: !project.team_id ? null : Number(project.team_id)
                }
            }) as any;

            proxy.writeQuery({
                query: getProjectQuery,
                data: {
                    getProject: update(data.getProject, {
                        project: {
                            name: { $set: result.data.editProject.name },
                            status: { $set: result.data.editProject.status },
                            deadline: { $set: result.data.editProject.deadline },
                            description: { $set: result.data.editProject.description }
                        }
                    })
                }
            });
        }
    });

    useEffect(() => {
        if (data) {
            if (data.editProject) {
                setEditing(false);
            }
        }
    }, [data]);

    async function handleEditProject(data: EditProjectInput) {
        await editProjectMutation({
            variables: {
                data,
                project_id: Number(project.project_id),
                team_id: Number(project.team_id)
            }
        })
    }

    return (
        <div className={projectEditFormStyles.project_form_wrapper}>
            <form className={projectEditFormStyles.form}
                onSubmit={handleSubmit(handleEditProject)}>
                <div className={projectEditFormStyles.input_wrapper}>
                    <div className={projectEditFormStyles.form_label}>
                        <MdSubtitles className={projectEditFormStyles.display_icon} />
                        <label className={projectEditFormStyles.label}>
                            Name
                        </label>
                    </div>
                    <input
                        className={projectEditFormStyles.input}
                        name='name'
                        type='text'
                        autoComplete='off'
                        placeholder='Enter project name...'
                        defaultValue={project.name}
                        {...register('name', {
                            validate: {
                                min_length: (value) => { return value.trimStart().trimEnd().replace(/\s+/g, " ").length >= 1 },
                                max_length: (value) => { return value.trimStart().trimEnd().replace(/\s+/g, " ").length <= 20 }
                            }
                        })} />
                    {errors.name && errors.name.type === 'validate' && (
                        <div className='error_message'>Name is empty!</div>
                    )}
                    {errors.name && errors.name.type === 'min_length' && (
                        <div className='error_message'>Name has to be at least 1 characters long!</div>
                    )}
                    {errors.name && errors.name.type === 'max_length' && (
                        <div className='error_message'>Name cannot be longer than 20 characters!</div>
                    )}
                </div>
                <div className={projectEditFormStyles.input_wrapper}>
                    <div className={projectEditFormStyles.form_label}>
                        <GiProgression className={projectEditFormStyles.display_icon} />
                        <label className={projectEditFormStyles.label}>
                            Status
                        </label>
                    </div>
                    <input
                        className={projectEditFormStyles.input}
                        name='status'
                        type='text'
                        autoComplete='off'
                        placeholder='Enter projects status...'
                        defaultValue={project.status}
                        {...register('status', {
                            validate: (data: string) => data.trim().length !== 0,
                            minLength: 1,
                            maxLength: 20
                        })} />
                    {errors.status && errors.status.type === 'validate' && (
                        <div className='error_message'>Status is empty!</div>
                    )}
                    {errors.status && errors.status.type === 'minLength' && (
                        <div className='error_message'>Status has to be at least 3 characters long!</div>
                    )}
                    {errors.status && errors.status.type === 'maxLength' && (
                        <div className='error_message'>Status cannot be longer than 15 characters!</div>
                    )}
                </div>
                <div className={projectEditFormStyles.input_wrapper}>
                    <div className={projectEditFormStyles.form_label}>
                        <MdDateRange className={projectEditFormStyles.display_icon} />
                        <label className={projectEditFormStyles.label}>
                            Deadline
                        </label>
                    </div>
                    <input
                        className={projectEditFormStyles.input}
                        name='deadline'
                        type='date'
                        autoComplete='off'
                        placeholder='Enter projects deadline...'
                        defaultValue={dayjs(project.deadline).toISOString().substr(0, 10)}
                        {...register('deadline', {
                            required: true
                        })} />
                    {errors.deadline && errors.deadline.type === 'required' && (
                        <div className='error_message'>Deadline is empty!</div>
                    )}
                </div>
                <div className={projectEditFormStyles.input_wrapper}>
                    <div className={projectEditFormStyles.form_label}>
                        <MdDescription className={projectEditFormStyles.display_icon} />
                        <label className={projectEditFormStyles.label}>
                            Description
                        </label>
                    </div>
                    <TextareaAutosize
                        className={[projectEditFormStyles.input, projectEditFormStyles.textarea].join(' ')}
                        name='description'
                        autoComplete='off'
                        placeholder='Enter projects description...'
                        defaultValue={project.description}
                        {...register('description')} />
                </div>
                <button className={projectEditFormStyles.submit_button}
                    type='submit'>
                    Submit</button>
            </form>
        </div>
    )
}

export default ProjectEditForm;