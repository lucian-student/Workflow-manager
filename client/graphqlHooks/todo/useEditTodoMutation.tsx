import React, { useEffect } from 'react';
import { TodoResponse, useEditTodoMutation as useMutation } from '../../generated/apolloComponents';
import editTodoUpdate from '../../subscriptionUpdates/todo/editTodoUpdate';

interface Props {
    project_id: string
    card_id: string
    team_id?: string
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export function useEditTodoMutation({ project_id, team_id, setEditing }: Props) {

    const [editTodoMutation, { data }] = useMutation({
        onError(err) {
            console.log(err);
        },
        update(proxy, result) {
            if (team_id) {
                console.log('team_project');
                return;
            }

            editTodoUpdate(result.data.editTodo as TodoResponse, project_id, proxy, team_id);

        }
    });

    useEffect(() => {
        if (data) {
            setEditing(false);
        }
    }, [data]);

    return {
        editTodoMutation
    }
}