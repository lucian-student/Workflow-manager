import { ApolloCache, ApolloClient } from "@apollo/client";
import { Card, TodoResponse, EditTodoMutation } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getCardQuery } from '../../graphql/card/query/getCard';

export default function editTodoUpdateCard(editTodo: TodoResponse, project_id: string, client: ApolloClient<Object> | ApolloCache<EditTodoMutation>, team_id?: string): void {

    const query = client.readQuery({
        query: getCardQuery,
        variables: {
            project_id: Number(project_id),
            card_id: Number(editTodo.todo.card_id),
            team_id: Number(team_id)
        }
    }) as { getCard: Card };

    client.writeQuery({
        query: getCardQuery,
        variables: {
            project_id: Number(project_id),
            card_id: Number(editTodo.todo.card_id),
            team_id: Number(team_id)
        },
        data: {
            getCard: update(query.getCard, {
                todos: {
                    [query.getCard.todos.findIndex(t => Number(t.todo_id) === Number(editTodo.todo.todo_id))]: {
                        $set: editTodo.todo
                    }
                }
            })
        }
    });

}