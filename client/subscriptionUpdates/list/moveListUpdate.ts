import { ApolloCache, ApolloClient } from "@apollo/client";
import { GetProjectResponse, MoveListMutation, MoveListResponse } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getProjectQuery } from '../../graphql/project/query/getProject';

export default function moveListUpdate(moveList: MoveListResponse, project_id: string, client: ApolloClient<Object> | ApolloCache<MoveListMutation>, subscribtion: boolean, team_id?: string): void {

    const query = client.readQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project_id),
            team_id: Number(team_id)
        }
    }) as { getProject: GetProjectResponse };

    const listIndex = query.getProject.project.lists.findIndex(l => Number(l.list_id) === Number(moveList.list_id));

    if (subscribtion) {
        if (query.getProject.project.lists[moveList.order_index]) {
            if (query.getProject.project.lists[moveList.order_index].list_id === moveList.list_id) {
                return;
            }
        }
    }

    const copy = { ...query.getProject.project.lists[listIndex] }

    client.writeQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project_id),
            team_id: Number(team_id)
        },
        data: {
            getProject: update(query.getProject, {
                project: {
                    lists: {
                        $splice: [
                            [listIndex, 1],
                            [moveList.order_index, 0, copy]
                        ]
                    }
                }
            })
        }
    });

}