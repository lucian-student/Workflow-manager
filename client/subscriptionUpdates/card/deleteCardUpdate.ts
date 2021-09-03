import { ApolloCache, ApolloClient } from "@apollo/client";
import { GetProjectResponse, DeleteCardResponse, DeleteCardMutation } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getProjectQuery } from '../../graphql/project/query/getProject';

export default function deleteCardUpdate(project_id: string, deleteCard: DeleteCardResponse, proxy: ApolloClient<Object> | ApolloCache<DeleteCardMutation>, team_id?: string): void {
    const query2 = proxy.readQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project_id),
            team_id: !Number(team_id) ? null : Number(team_id)
        }
    }) as { getProject: GetProjectResponse };

    const listIndex = query2.getProject.project.lists.findIndex(l => Number(l.list_id) === Number(deleteCard.list_id));
    const cardIndex = query2.getProject.project.lists[listIndex].cards.findIndex(c => Number(c.card_id) === Number(deleteCard.card_id));

    proxy.writeQuery({
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
                                $splice: [[cardIndex, 1]]
                            }
                        }
                    }
                }
            })
        }
    });
}
