import { gql } from '@apollo/client';

export const deleteListMutation = gql`
mutation DeleteList(
    $project_id:Float!,
    $list_id:Float!,
    $team_id:Float
){
    deleteList(
        project_id:$project_id,
        list_id:$list_id,
        team_id:$team_id
    )
}
`;