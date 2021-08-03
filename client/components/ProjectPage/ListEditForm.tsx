import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import listFormStyles from './ListEditForm/ListEditForm.module.css';
import { ImCancelCircle } from 'react-icons/im';
import { CloseMenuContext } from '../../context/closeMenu';
import { ListInput, useEditListMutation, List } from '../../generated/apolloComponents';
import { ProjectContext } from '../../context/project';
import { getProjectQuery } from '../../graphql/project/query/getProject';
import update from 'immutability-helper';

interface Props {
    list: List
}


function ListEditForm({ list }: Props): JSX.Element {

    const { handleSubmit, register } = useForm();

    const { setEditing } = useContext(CloseMenuContext);

    const { project } = useContext(ProjectContext);

    async function handleEditList(data: ListInput) {
        await editListMutation({
            variables: {
                data,
                project_id: Number(list.project_id),
                team_id: Number(project.team_id),
                list_id: Number(list.list_id)
            }
        })
    }

    const [editListMutation, { data }] = useEditListMutation({
        onError(err) {
            console.log(err.message);
        },
        update(proxy, result) {
            const data = proxy.readQuery({
                query: getProjectQuery,
                variables: {
                    project_id: Number(list.project_id),
                    team_id: !project.team_id ? null : Number(project.team_id)
                }
            }) as any;

            proxy.writeQuery({
                query: getProjectQuery,
                data: {
                    getProject: update(data.getProject, {
                        project: {
                            lists: {
                                $apply: lists => lists.map((item) => {
                                    if (item.list_id as string !== result.data.editList.list_id) {
                                        return item;
                                    } else {
                                        return {
                                            ...result.data.editList
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            });
        }
    });

    useEffect(() => {
        if (data) {
            setEditing(false);
        }
    }, [data])

    return (
        <form className={listFormStyles.form}
            onSubmit={handleSubmit(handleEditList)}>
            <div>
                <input
                    className={listFormStyles.input}
                    name='name'
                    type='text'
                    autoComplete='off'
                    placeholder='Enter name of the column...'
                    defaultValue={list.name}
                    {...register('name', {
                        validate: (value) => { return !!value.trim() }
                    })} />
            </div>
            <div className={listFormStyles.form_actions}>
                <button type='submit' className={listFormStyles.submit_button}>
                    Save
                </button>
                <ImCancelCircle className={listFormStyles.cancel_icon}
                    onClick={() => { setEditing(false); }} />
            </div>
        </form>
    )
}

export default ListEditForm;