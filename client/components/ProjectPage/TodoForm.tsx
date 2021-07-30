import React from 'react';
import todoFormStyles from './TodoForm/TodoForm.module.css';
import { useForm } from 'react-hook-form';
import { MdSubtitles } from 'react-icons/md';
import { TodoInput } from '../../generated/apolloComponents';


interface Props {
    addTodo: (data: TodoInput) => void | Promise<void>
}

function TodoForm({ addTodo }: Props): JSX.Element {

    const { handleSubmit, register, formState: { errors } } = useForm();

    return (
        <div className={todoFormStyles.todo_form_wrapper}>
            <form onSubmit={handleSubmit(addTodo)}
                className={todoFormStyles.form}>
                <div className={todoFormStyles.input_wrapper}>
                    <div className={todoFormStyles.form_label}>
                        <MdSubtitles className={todoFormStyles.display_icon} />
                        <label className={todoFormStyles.label}>
                            Name
                        </label>
                    </div>
                    <input
                        className={todoFormStyles.input}
                        name='name'
                        type='text'
                        autoComplete='off'
                        placeholder='Enter todo name...'
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
                <button className={todoFormStyles.submit_button}
                    type='submit'>
                    Add Todo
                </button>
            </form>
        </div>
    )
}

export default TodoForm;