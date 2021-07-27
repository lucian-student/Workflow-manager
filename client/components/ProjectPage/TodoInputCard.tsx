import React from 'react';
import { TodoInput } from '../../generated/apolloComponents';

interface Props {
    todo: TodoInput
}

function TodoInputCard({ todo }: Props): JSX.Element {

    return (
        <div>
            <div>
                {todo.name}
            </div>
        </div>
    )
}

export default TodoInputCard;