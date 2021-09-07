import { ApolloCache, ApolloClient } from "@apollo/client";
import { GetProjectResponse, DeleteTodoMutation, DeleteTodoResponse } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getProjectQuery } from '../../graphql/project/query/getProject';


export default function deleteTodoUpdateProject(deleteTodo: DeleteTodoResponse, project_id: string, client: ApolloClient<Object> | ApolloCache<DeleteTodoMutation>, team_id?: string): void {

    const query2 = client.readQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project_id),
            team_id: !Number(team_id) ? null : Number(team_id)
        }
    }) as { getProject: GetProjectResponse };

    const listIndex = query2.getProject.project.lists
        .findIndex(l => Number(l.list_id) === Number(deleteTodo.list_id));

    const cardIndex = query2.getProject.project.lists[listIndex].cards
        .findIndex(c => Number(c.card_id) === Number(deleteTodo.card_id));

    const todoIndex = query2.getProject.project.lists[listIndex].cards[cardIndex].todos
        .findIndex(t => Number(t.todo_id) === Number(deleteTodo.todo_id));

    client.writeQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project_id),
            team_id: !Number(team_id) ? null : Number(team_id)
        },
        data: {
            getProject: update(query2.getProject, {
                project: {
                    lists: {
                        [listIndex]: {
                            cards: {
                                [cardIndex]:
                                {
                                    todos: {
                                        $splice: [[todoIndex, 1]]
                                    }
                                }
                            }
                        }
                    }
                }
            })
        }
    });

}