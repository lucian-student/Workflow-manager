import React, { useEffect } from 'react';
import { useDeleteTodoMutation as useMutation } from '../../generated/apolloComponents';
import deleteTodoUpdateCard from '../../subscriptionUpdates/todo/deleteTodoUpdateCard';
import deleteTodoUpdateProject from '../../subscriptionUpdates/todo/deleteTodoUpdateProject';

interface Props {
    project_id: string
    card_id: string
    team_id?: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export function useDeleteTodoMutation({ project_id, team_id, setOpen }: Props) {

    const [deleteTodoMutation, { data }] = useMutation({
        onError(err) {
            console.log(err);
        },
        update(proxy, result) {
            if (team_id) {
                console.log('team_project');
                return;
            }
            deleteTodoUpdateCard(result.data.deleteTodo, project_id, proxy, team_id);
            deleteTodoUpdateProject(result.data.deleteTodo, project_id, proxy, team_id);
        }
    });

    useEffect(() => {
        if (data) {
            setOpen(false);
        }
    }, [data]);

    return {
        deleteTodoMutation
    }
}