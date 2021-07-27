import React, { useContext } from 'react';
import { CardAddContext } from '../../context/cardAdd';
import todoInputDisplay from './TodoInputDisplay/TodoInputDisplay.module.css';
import TodoInputCard from './TodoInputCard';

function TodoInputDisplay(): JSX.Element {

    const { todos } = useContext(CardAddContext);

    return (
        <div className={todoInputDisplay.display_wrapper}>
            {todos.map((todo, index) => (
                <TodoInputCard key={index} todo={todo} />
            ))}
        </div>
    )
}

export default TodoInputDisplay;