import React from 'react';
import todoFormStyles from './TodoForm/TodoForm.module.css';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function TodoForm({ setOpen }: Props): JSX.Element {

    return (
        <div>
            <button className={todoFormStyles.toggle_button}
                onClick={() => setOpen(old => !old)}>
                Add Todo
            </button>
        </div>
    )
}

export default TodoForm;