import { GetProjectResponse, useMoveListMutation as useMutation } from '../../generated/apolloComponents';
import update from 'immutability-helper'
import { getProjectQuery } from '../../graphql/project/query/getProject';

interface Props {
    project_id: string,
    team_id: string | null
}
//optimistic response shape
/*
        optimisticResponse: {
            moveList: {
                __typename: 'MoveListResponse',
                list_id,
                order_index: 3
            }
        }
*/

export default function useMoveListMutation({ project_id, team_id }: Props) {

    const [moveListMutation] = useMutation({
        onError(err) {
            console.log(err);
        },
        update(proxy, result) {

            const query = proxy.readQuery({
                query: getProjectQuery,
                variables: {
                    project_id: Number(project_id),
                    team_id: !Number(team_id) ? null : Number(team_id)
                }
            }) as { getProject: GetProjectResponse };

            const listIndex = query.getProject.project.lists.findIndex(l => Number(l.list_id) === Number(result.data.moveList.list_id));

            const copy = { ...query.getProject.project.lists[listIndex] }

            proxy.writeQuery({
                query: getProjectQuery,
                variables: {
                    project_id: Number(project_id),
                    team_id: !Number(team_id) ? null : Number(team_id)
                },
                data: {
                    getProject: update(query.getProject, {
                        project: {
                            lists: {
                                $splice: [
                                    [listIndex, 1],
                                    [result.data.moveList.order_index, 0, copy]
                                ]
                            }
                        }
                    })
                }
            });
        }
    });

    return {
        moveListMutation
    }
}