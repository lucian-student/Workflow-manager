import React from "react";
import { VscAdd } from 'react-icons/vsc';
import { ImCancelCircle } from 'react-icons/im';
import projectFormStyles from './ProjectForm/ProjectForm.module.css';
import { useForm } from 'react-hook-form';
import { useDropDownMenu } from "../../hooks/useDropdownMenu";
import { CreateProjectInput, useCreateProjectMutation } from '../../generated/apolloComponents';
import { getProjectQuery } from '../../graphql/project/query/getProjects';

function ProjectForm(): JSX.Element {

    const { handleSubmit, register, formState: { errors } } = useForm();
    const { menuRef, open, setOpen } = useDropDownMenu();

    const [createProjectMutation] = useCreateProjectMutation({
        onError(err) {
            console.log(err.message);
        },
        update(proxy, result) {
            const data = proxy.readQuery({
                query: getProjectQuery
            }) as any;
            proxy.writeQuery({
                query: getProjectQuery,
                data: { getProjects: [result.data.createProject, ...data.getProjects] }
            });
        }
    });

    async function handleCreateProject(data: CreateProjectInput) {
        await createProjectMutation({ variables: { data } });
        setOpen(false);
    }

    return (
        <div>
            <button className={projectFormStyles.modal_button}
                onClick={() => setOpen(true)}>
                <VscAdd className={projectFormStyles.add_icon} />
            </button>
            <div className={open ? projectFormStyles.modal_bg : projectFormStyles.hide_modal}>
                <div ref={menuRef} className={projectFormStyles.modal}>
                    <ImCancelCircle className={projectFormStyles.cancel_modal}
                        onClick={() => setOpen(false)} />
                    <form onSubmit={handleSubmit(handleCreateProject)}
                        className={projectFormStyles.form}>
                        <div className={projectFormStyles.input_wrapper}>
                            <label className={projectFormStyles.label}>
                                Name
                            </label>
                            <input
                                className={projectFormStyles.input}
                                name='name'
                                type='text'
                                autoComplete='off'
                                placeholder='Enter project name...'
                                {...register('name', {
                                    validate: (data: string) => data.trim().length !== 0,
                                    minLength: 1,
                                    maxLength: 20
                                })} />
                            {errors.name && errors.name.type === 'validate' && (
                                <div className='error_message'>Name is empty!</div>
                            )}
                            {errors.name && errors.name.type === 'minLength' && (
                                <div className='error_message'>Name has to be at least 3 characters long!</div>
                            )}
                            {errors.name && errors.name.type === 'maxLength' && (
                                <div className='error_message'>Name cannot be longer than 15 characters!</div>
                            )}
                        </div>
                        <div className={projectFormStyles.input_wrapper}>
                            <label className={projectFormStyles.label}>
                                Status
                            </label>
                            <input
                                className={projectFormStyles.input}
                                name='status'
                                type='text'
                                autoComplete='off'
                                placeholder='Enter project status...'
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
                        <div className={projectFormStyles.input_wrapper}>
                            <label className={projectFormStyles.label}>
                                Deadline
                            </label>
                            <input
                                className={projectFormStyles.input}
                                name='deadline'
                                type='date'
                                autoComplete='off'
                                placeholder='Enter project deadline...'
                                {...register('deadline', {
                                    required: true
                                })} />
                            {errors.deadline && errors.deadline.type === 'required' && (
                                <div className='error_message'>Deadline is empty!</div>
                            )}
                        </div>
                        <div className={projectFormStyles.input_wrapper}>
                            <label className={projectFormStyles.label}>
                                Description
                            </label>
                            <textarea
                                className={[projectFormStyles.input, projectFormStyles.text_area].join(' ')}
                                name='description'
                                autoComplete='off'
                                placeholder='Enter project description...'
                                {...register('description', {
                                    minLength: 1
                                })} />
                            {errors.status && errors.status.type === 'minLength' && (
                                <div className='error_message'>Description has to be at least 1 characters long!</div>
                            )}
                        </div>
                        <button className={projectFormStyles.submit_button}
                            type='submit'>
                            Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProjectForm;