import React, { useState, useEffect, useContext } from 'react';
import { TodoInput } from '../../generated/apolloComponents';
import todoInputCardStyles from './TodoInputCard/TodoInputCard.module.css';
import { RiTodoLine } from 'react-icons/ri';
import TodoInputOptions from './TodoInputOptions';
import TodoEditForm from './TodoEditForm';
import { CardAddContext } from '../../context/cardAdd';
import update from 'immutability-helper';

interface Props {
    todo: TodoInput
    index: number
}

function TodoInputCard({ todo, index }: Props): JSX.Element {

    const [editing, setEditing] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);

    const { setOpenTodoOptions, setTodos, todos } = useContext(CardAddContext);

    function editTodo(data: TodoInput) {
        setEditing(false);
        setTodos(update(todos, {
            [index]: {
                $set: data
            }
        }));
    }

    useEffect(() => {
        if (open || editing) {
            setOpenTodoOptions(true);
        } else {
            setOpenTodoOptions(false);
        }
    }, [open, editing]);

    return (
        <div className={todoInputCardStyles.todo_input_card}>
            <div className={todoInputCardStyles.type_icon_wrapper}>
                <RiTodoLine className={todoInputCardStyles.type_icon} />
            </div>
            <div className={todoInputCardStyles.input_wrapper}>
                <div>
                    <div className={todoInputCardStyles.text}>
                        {todo.name}
                    </div>
                </div>
                <div className={todoInputCardStyles.options_wrapper}>
                    <TodoInputOptions setEditing={setEditing} index={index} open={open} setOpen={setOpen} />
                </div>
            </div>
            {editing && (
                <TodoEditForm setOpen={setEditing} todo={todo} editTodo={editTodo} />
            )}
        </div>
    )
}

export default TodoInputCard;