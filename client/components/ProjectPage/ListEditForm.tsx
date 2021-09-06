import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import listFormStyles from './ListEditForm/ListEditForm.module.css';
import { ImCancelCircle } from 'react-icons/im';
import { CloseMenuContext } from '../../context/closeMenu';
import { ListInput, useEditListMutation, List } from '../../generated/apolloComponents';
import { ProjectContext } from '../../context/project';
import editListUpdate from '../../subscriptionUpdates/list/editListUpdate';
import Team_id from '../../pages/team/[team_id]';

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
           if(project.team_id){
               console.log('team_project');
               return;
           }
           editListUpdate(result.data.editList as List,project.project_id,proxy,project.team_id);
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