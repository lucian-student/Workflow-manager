import React, { useEffect } from "react";
import listFormStyles from './ListForm/ListForm.module.css';
import { VscAdd } from 'react-icons/vsc';
import { ImCancelCircle } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import { List, useCreateListMutation } from '../../generated/apolloComponents';
import { useDropDownMenu } from '../../hooks/useDropdownMenu';
import createListUpdate from '../../subscriptionUpdates/list/createListUpdate';

interface Props {
    project_id: string
    team_id: string | null
}

function ListForm({ project_id, team_id }: Props): JSX.Element {

    const { register, handleSubmit, reset } = useForm();

    const { open, setOpen, menuRef } = useDropDownMenu();

    const [createListMutation, { data }] = useCreateListMutation({
        update(proxy, result) {
            if (team_id) {
                console.log('team_project');
                return;
            }
            createListUpdate(result.data.createList as List, project_id, proxy, team_id);
        },
        onError(err) {
            console.log(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            reset();
            setOpen(false);
        }
    }, [data])

    async function handleCreateList(data: { name: string }) {
        await createListMutation({
            variables: {
                data: { name: data.name.trimStart().trimEnd().replace(/\s+/g, " ") },
                project_id: Number(project_id),
                team_id: Number(team_id)
            }
        });
    }
    return (
        <div className={listFormStyles.list_form_wrapper}>
            <div className={listFormStyles.content_wrapper} ref={menuRef}>
                <form className={listFormStyles.form}
                    onSubmit={handleSubmit(handleCreateList)}>
                    {!open ? (
                        <button className={listFormStyles.toggle_button}
                            onClick={() => setOpen(true)}>
                            <VscAdd className={listFormStyles.icon} />
                            <div className={listFormStyles.heading}>
                                create list
                            </div>
                        </button>
                    ) : (
                        <div>
                            <div>
                                <input
                                    className={listFormStyles.input}
                                    name='name'
                                    type='text'
                                    autoComplete='off'
                                    placeholder='Enter name of the column...'
                                    {...register('name', {
                                        validate: (value) => { return !!value.trim() }
                                    })} />
                            </div>
                            <div className={listFormStyles.form_actions}>
                                <button type='submit' className={listFormStyles.submit_button}>
                                    Add column
                                </button>
                                <ImCancelCircle className={listFormStyles.cancel_icon}
                                    onClick={() => { setOpen(false); reset() }} />
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default ListForm;