import React, { useEffect } from "react";
import { TodoResponse, useCreateTodoMutation as useMutation } from '../../generated/apolloComponents';
import { getCardQuery } from '../../graphql/card/query/getCard';
import update from 'immutability-helper'
import { getProjectQuery } from '../../graphql/project/query/getProject';
import createTodoUpdateCard from '../../subscriptionUpdates/todo/createTodoUpdateCard';
import createTodoUpdateProject from '../../subscriptionUpdates/todo/createTodoUpdateProject';

interface Props {
    project_id: string
    card_id: string
    team_id?: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function useCreateTodoMutation({ project_id, setOpen, team_id }: Props) {

    const [createTodoMutation, { data }] = useMutation({
        onError(err) {
            console.log(err.message);
        },
        update(proxy, result) {
            if (team_id) {
                console.log('team_project');
                return;
            }
            createTodoUpdateCard(result.data.createTodo as TodoResponse, project_id, proxy, team_id);
            createTodoUpdateProject(result.data.createTodo as TodoResponse, project_id, proxy, team_id);
        }
    });

    useEffect(() => {
        if (data) {
            setOpen(false);
        }
    }, [data]);

    return {
        createTodoMutation
    }
}