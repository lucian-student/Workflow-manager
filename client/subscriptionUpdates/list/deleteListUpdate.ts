import { ApolloCache, ApolloClient } from "@apollo/client";
import { GetProjectResponse, List, DeleteListMutation } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getProjectQuery } from '../../graphql/project/query/getProject';

export default function createListUpdate(deleteList: string, project_id: string, client: ApolloClient<Object> | ApolloCache<DeleteListMutation>, team_id?: string): void {

    const data = client.readQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project_id),
            team_id: Number(team_id)
        }
    }) as { getProject: GetProjectResponse };

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
                        $apply: (lists: List[]) => {
                            return lists
                                .filter(item => Number(item.list_id) !== Number(deleteList))
                        }
                    }
                }
            })
        }
    });
}