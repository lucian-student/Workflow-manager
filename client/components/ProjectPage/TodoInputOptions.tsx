import React, { useContext, useState, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import todoInputOptionsStyles from './TodoInputOptions/TodoInputOptions.module.css';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';
import { CardAddContext } from '../../context/cardAdd';

function TodoInputOptions(): JSX.Element {

    const [open, setOpen] = useState<boolean>(false);

    const { setOpenTodoOptions } = useContext(CardAddContext);

    const { menuRef } = useDropdownCustom({ setOpen });

    useEffect(() => {
        return () => {
            if (!open) {
                setOpenTodoOptions(false);
            } else {
                setOpenTodoOptions(true);
            }
        }
    }, [open]);

    function removeTodo() {
        setOpenTodoOptions(false);
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
                            onClick={() => { }}>
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