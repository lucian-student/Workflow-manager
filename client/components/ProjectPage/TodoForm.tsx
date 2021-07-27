import React, { useContext } from 'react';
import todoFormStyles from './TodoForm/TodoForm.module.css';
import { useForm } from 'react-hook-form';
import { MdSubtitles, MdDescription } from 'react-icons/md';
import { CardAddContext } from '../../context/cardAdd';
import { TodoInput } from '../../generated/apolloComponents';

function TodoForm(): JSX.Element {

    const { handleSubmit, register, formState: { errors } } = useForm();

    const { setTodos } = useContext(CardAddContext);

    function addTodo(data: TodoInput) {
        setTodos(todos => {
            return [data, ...todos]
        })
    }

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
                        placeholder='Enter card name...'
                        {...register('name', {
                            validate: {
                                min_length: (value) => { return value.trimStart().trimEnd().replace(/\s+/g, " ").length >= 1 },
                                max_length: (value) => { return value.trimStart().trimEnd().replace(/\s+/g, " ").length <= 15 }
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
                <div className={todoFormStyles.input_wrapper}>
                    <div className={todoFormStyles.form_label}>
                        <MdDescription className={todoFormStyles.display_icon} />
                        <label className={todoFormStyles.label}>
                            Description
                        </label>
                    </div>
                    <textarea
                        className={[todoFormStyles.input, todoFormStyles.text_area].join(' ')}
                        name='description'
                        autoComplete='off'
                        placeholder='Enter card description...'
                        {...register('description')} />
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