import React, { useState, useContext, useEffect } from 'react'
//import update from 'immutability-helper';
import { Todo, TodoInput } from '../../generated/apolloComponents';
import todoCardStyles from './TodoCard/TodoCard.module.css';
import { RiTodoLine } from 'react-icons/ri';
import TodoEditForm from './TodoEditForm';
import Options from './Options';
import { CardViewContext } from '../../context/cardView';

interface Props {
    todo: Todo
}

function TodoCard({ todo }: Props): JSX.Element {
    const [editing, setEditing] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);

    const { setOpenTodoOptions } = useContext(CardViewContext);

    async function editTodo(editTodo: TodoInput) {

    }

    async function removeTodo() {

    }

    async function doneTodo(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.checked);
    }

    useEffect(() => {
        if (open || editing) {
            setOpenTodoOptions(true);
        } else {
            setOpenTodoOptions(false);
        }
    }, [open, editing]);

    return (
        <div className={todoCardStyles.todo_input_card}>
            <div className={todoCardStyles.type_icon_wrapper}>
                <RiTodoLine className={todoCardStyles.type_icon} />
            </div>
            <div className={todoCardStyles.input_wrapper}>
                <div className={todoCardStyles.todo_data}>
                    <div className={todoCardStyles.text}>
                        {todo.name}
                    </div>
                    <form>
                        <input
                            onChange={doneTodo.bind(this)}
                            name='done'
                            checked={todo.done}
                            type='checkbox' />
                    </form>
                </div>
                <div className={todoCardStyles.options_wrapper}>
                    <Options type='todo' setEditing={setEditing} open={open} setOpen={setOpen} remove={removeTodo} />
                </div>
            </div>
            {editing && (
                <TodoEditForm setOpen={setEditing} todo={todo} editTodo={editTodo} />
            )}
        </div>
    )
}

export default TodoCard;