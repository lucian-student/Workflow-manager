import React from 'react';
import TodoEditFormStyles from './TodoEditForm/TodoEditForm.module.css';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';
import { useForm } from 'react-hook-form';
import { MdSubtitles } from 'react-icons/md';
import { TodoInput } from '../../generated/apolloComponents';
import { ImCancelCircle } from 'react-icons/im';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    todo: TodoInput
    editTodo: (data: TodoInput) => void | Promise<void>
}

function TodoEditForm({ setOpen, todo, editTodo }: Props): JSX.Element {

    const { menuRef } = useDropdownCustom({ setOpen });

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div ref={menuRef} className={TodoEditFormStyles.todo_form_wrapper}>
            <form onSubmit={handleSubmit(editTodo)}
                className={TodoEditFormStyles.form}>
                <div className={TodoEditFormStyles.input_wrapper}>
                    <div className={TodoEditFormStyles.form_label}>
                        <MdSubtitles className={TodoEditFormStyles.display_icon} />
                        <label className={TodoEditFormStyles.label}>
                            Name
                        </label>
                    </div>
                    <input
                        className={TodoEditFormStyles.input}
                        name='name'
                        type='text'
                        autoComplete='off'
                        placeholder='Enter todo name...'
                        defaultValue={todo.name}
                        {...register('name', {
                            validate: {
                                min_length: (value) => { return value.trimStart().trimEnd().replace(/\s+/g, " ").length >= 1 }
                            }
                        })} />
                    {errors.name && errors.name.type === 'validate' && (
                        <div className='error_message'>Name is empty!</div>
                    )}
                    {errors.name && errors.name.type === 'min_length' && (
                        <div className='error_message'>Name has to be at least 1 characters long!</div>
                    )}
                </div>
                <div className={TodoEditFormStyles.form_actions}>
                    <button type='submit' className={TodoEditFormStyles.submit_button}>
                        Save
                    </button>
                    <ImCancelCircle className={TodoEditFormStyles.cancel_icon}
                        onClick={() => { setOpen(false); }} />
                </div>
            </form>
        </div>
    )
}

export default TodoEditForm;