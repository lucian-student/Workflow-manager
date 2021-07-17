import React, { useState } from "react";
import listFormStyles from './ListForm/ListForm.module.css';
import { VscAdd } from 'react-icons/vsc';
import { ImCancelCircle } from 'react-icons/im';
import { useForm } from 'react-hook-form';

function ListForm(): JSX.Element {
    const [openForm, setOpenForm] = useState<boolean>(false);

    const { register, handleSubmit } = useForm();

    function handleCreateList(data:{name:string}) {
        console.log(data.name.trim());
    }

    return (
        <div className={listFormStyles.list_form_wrapper}>
            <div className={listFormStyles.content_wrapper}>
                {!openForm ? (
                    <button className={listFormStyles.toggle_button}
                        onClick={() => setOpenForm(true)}>
                        <VscAdd className={listFormStyles.icon} />
                        <div className={listFormStyles.heading}>
                            create list
                        </div>
                    </button>
                ) : (
                    <form className={listFormStyles.form}
                        onSubmit={handleSubmit(handleCreateList)}>
                        <div>
                            <input
                                name='name'
                                type='text'
                                autoComplete='off'
                                placeholder='Enter name of the column...'
                                {...register('name', {
                                    validate: (value) => { return !!value.trim()}
                                })} />
                        </div>
                        <div>
                            <button type='submit'>
                                Add column
                            </button>
                            <button onClick={() => setOpenForm(false)}>
                                <ImCancelCircle />
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ListForm;