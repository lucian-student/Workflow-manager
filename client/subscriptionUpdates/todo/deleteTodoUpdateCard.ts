import { ApolloCache, ApolloClient } from "@apollo/client";
import { Card, DeleteTodoMutation, DeleteTodoResponse } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getCardQuery } from '../../graphql/card/query/getCard';

export default function deleteTodoUpdateCard(deleteTodo: DeleteTodoResponse, project_id: string, client: ApolloClient<Object> | ApolloCache<DeleteTodoMutation>, team_id?: string): void {

    const query = client.readQuery({
        query: getCardQuery,
        variables: {
            project_id: Number(project_id),
            card_id: Number(deleteTodo.card_id),
            team_id: Number(team_id)
        }
    }) as { getCard: Card };

    client.writeQuery({
        query: getCardQuery,
        variables: {
            project_id: Number(project_id),
            card_id: Number(deleteTodo.card_id),
            team_id: Number(team_id)
        },
        data: {
            getCard: update(query.getCard, {
                todos: {
                    $splice: [[query.getCard.todos.findIndex(t => Number(t.todo_id) === Number(deleteTodo.todo_id)), 1]]
                }
            })
        }
    });

}