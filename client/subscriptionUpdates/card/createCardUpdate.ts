import { ApolloCache, ApolloClient } from "@apollo/client";
import { GetProjectResponse, CreateCardMutation, Card } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getProjectQuery } from '../../graphql/project/query/getProject';

export default function createCardUpdate(createCard: Card, project_id: string, client: ApolloClient<Object> | ApolloCache<CreateCardMutation>, team_id?: string): void {

    const data = client.readQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project_id),
            team_id: Number(team_id)
        }
    }) as { getProject: GetProjectResponse };

    /*console.log(project_id);
    console.log(team_id);
    console.log(data);*/

    client.writeQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project_id),
            team_id: Number(team_id)
        },
        data: {
            getProject: update(data.getProject, {
                project: {
                    lists: {
                        [data.getProject.project.lists.findIndex(l => Number(l.list_id) === Number(createCard.list_id))]: {
                            cards: {
                                $push: [createCard]
                            }
                        }
                    }
                }
            })
        }
    });

}