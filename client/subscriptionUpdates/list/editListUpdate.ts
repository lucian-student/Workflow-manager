import { ApolloCache, ApolloClient } from "@apollo/client";
import { GetProjectResponse, List, EditListMutation } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getProjectQuery } from '../../graphql/project/query/getProject';

export default function editListUpdate(editList: List, project_id: string, client: ApolloClient<Object> | ApolloCache<EditListMutation>, team_id?: string): void {

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
                        $apply: (lists: List[]) => lists.map((item) => {
                            if (item.list_id as string !== editList.list_id) {
                                return item;
                            } else {
                                return {
                                    ...item,
                                    ...editList
                                }
                            }
                        })
                    }
                }
            })
        }
    });

}