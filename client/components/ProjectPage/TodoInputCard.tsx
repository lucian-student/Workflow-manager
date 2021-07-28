import React from 'react';
import { TodoInput } from '../../generated/apolloComponents';
import todoInputCardStyles from './TodoInputCard/TodoInputCard.module.css';
import { RiTodoLine } from 'react-icons/ri';
import { MdSubtitles } from 'react-icons/md';
import TodoInputOptions from './TodoInputOptions';

interface Props {
    todo: TodoInput
}

function TodoInputCard({ todo }: Props): JSX.Element {

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
                    <TodoInputOptions />
                </div>
            </div>
        </div>
    )
}

export default TodoInputCard;