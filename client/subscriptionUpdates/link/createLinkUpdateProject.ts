import { ApolloCache, ApolloClient } from "@apollo/client";
import { GetProjectResponse, LinkResponse, CreateLinkMutation } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getProjectQuery } from '../../graphql/project/query/getProject';


export default function createLinkUpdateProject(createLink: LinkResponse, project_id: string, client: ApolloClient<Object> | ApolloCache<CreateLinkMutation>, team_id?: string): void {
    const query2 = client.readQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project_id),
            team_id: !Number(team_id) ? null : Number(team_id)
        }
    }) as { getProject: GetProjectResponse };

    const listIndex = query2.getProject.project.lists.findIndex(l => Number(l.list_id) === Number(createLink.list_id));
    const cardIndex = query2.getProject.project.lists[listIndex].cards.findIndex(c => Number(c.card_id) === Number(createLink.link.card_id));

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
                                    links: {
                                        $unshift: [createLink.link]
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