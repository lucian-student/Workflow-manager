import React from 'react';
import { Todo } from '../../generated/apolloComponents';

interface Props {
    todos: Todo[]
}

function TodoDisplay({ todos }: Props): JSX.Element {

    return (
        <div>
            {todos.map(todo => (
                <div key={todo.todo_id}>
                    todo
                </div>
            ))}
        </div>
    )
}

export default TodoDisplay;