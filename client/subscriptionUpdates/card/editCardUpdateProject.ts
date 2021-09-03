import { ApolloCache, ApolloClient } from "@apollo/client";
import { Card, GetProjectResponse, EditCardMutation } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getProjectQuery } from '../../graphql/project/query/getProject';

export default function editCardUpdateProject(editCard: Card, project_id: string, client: ApolloClient<Object> | ApolloCache<EditCardMutation>, team_id?: string): void {

    const query2 = client.readQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project_id),
            team_id: !Number(team_id) ? null : Number(team_id)
        }
    }) as { getProject: GetProjectResponse };

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
                        [query2.getProject.project.lists.findIndex(l => Number(l.list_id) === Number(editCard.list_id))]: {
                            cards: {
                                $apply: cards => cards.map((item) => {
                                    if (item.card_id as string === editCard.card_id) {
                                        return {
                                            ...item,
                                            ...editCard
                                        }
                                    } else {
                                        return item;
                                    }
                                })
                            }
                        }
                    }
                }
            })
        }
    });
}