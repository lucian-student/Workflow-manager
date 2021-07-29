import React, { useContext } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import todoInputOptionsStyles from './TodoInputOptions/TodoInputOptions.module.css';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';
import { CardAddContext } from '../../context/cardAdd';
import update from 'immutability-helper';

interface Props {
    index: number
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function TodoInputOptions({ index, setEditing, open, setOpen }: Props): JSX.Element {

    const { setOpenTodoOptions, setTodos, todos } = useContext(CardAddContext);

    const { menuRef } = useDropdownCustom({ setOpen });

    function removeTodo() {
        setOpenTodoOptions(false);
        setTodos(update(todos, {
            $splice: [
                [index, 1]
            ]
        }));
    }

    return (
        <div className={todoInputOptionsStyles.todo_input_options_wrapper}>
            <div ref={menuRef}>
                <button className={todoInputOptionsStyles.toggle_button}
                    onClick={() => { setOpen(old => !old) }}>
                    <BsThreeDots className={todoInputOptionsStyles.icon} />
                </button>
                {open && (
                    <div className={todoInputOptionsStyles.menu}>
                        <button className={todoInputOptionsStyles.menu_item}
                            onClick={() => { setOpen(false); setEditing(true) }}>
                            Edit Todo
                        </button>
                        <button className={todoInputOptionsStyles.menu_item}
                            onClick={removeTodo}>
                            Remove todo
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TodoInputOptions;