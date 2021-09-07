import { ApolloCache, ApolloClient } from "@apollo/client";
import { GetProjectResponse, DeleteMessageResponse, DeleteMessageMutation } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getProjectQuery } from '../../graphql/project/query/getProject';


export default function deleteMessageUpdateProject(deleteMessage: DeleteMessageResponse, project_id: string, client: ApolloClient<Object> | ApolloCache<DeleteMessageMutation>, team_id?: string): void {

    const query2 = client.readQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project_id),
            team_id: !Number(team_id) ? null : Number(team_id)
        }
    }) as { getProject: GetProjectResponse };

    const listIndex = query2.getProject.project.lists.findIndex(l => Number(l.list_id) === Number(deleteMessage.list_id));
    const cardIndex = query2.getProject.project.lists[listIndex].cards.findIndex(c => Number(c.card_id) === Number(deleteMessage.card_id));

    const messageIndex = query2.getProject.project.lists[listIndex].cards[cardIndex].messages
        .findIndex(m => Number(m.message_id) === Number(deleteMessage.message_id));

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
                                [cardIndex]: {
                                    messages: {
                                        $splice: [[messageIndex, 1]]
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