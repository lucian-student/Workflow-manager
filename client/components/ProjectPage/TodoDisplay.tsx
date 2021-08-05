import React from 'react';
import { Todo } from '../../generated/apolloComponents';
import todoDisplayStyles from './TodoDisplay/TodoDisplay.module.css';
import TodoCard from './TodoCard';

interface Props {
    todos: Todo[]
}

function TodoDisplay({ todos }: Props): JSX.Element {

    return (
        <div className={todoDisplayStyles.display_wrapper}>
            {todos.map(todo => (
                <TodoCard key={todo.todo_id} todo={todo} />
            ))}
        </div>
    )
}

export default TodoDisplay;