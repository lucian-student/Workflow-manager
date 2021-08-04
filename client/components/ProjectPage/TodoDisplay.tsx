import React, { useEffect } from 'react';
import { Todo } from '../../generated/apolloComponents';

interface Props {
    todos: Todo[]
}

function TodoDisplay({ todos }: Props): JSX.Element {

    useEffect(() => {
        console.log(todos)
    }, [todos]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {todos.map(todo => (
                <div key={todo.todo_id}>
                    {todo.name}
                </div>
            ))}
        </div>
    )
}

export default TodoDisplay;