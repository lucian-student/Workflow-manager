import { gql } from '@apollo/client';

export const editListMutation = gql`
mutation EditList(
    $project_id:Float!,
    $list_id:Float!,
    $data:ListInput!,
    $team_id:Float
){
    editList(
        project_id:$project_id,
        list_id:$list_id,
        data:$data,
        team_id:$team_id
    ){
        project_id
        list_id
        name
        order_index
    }
}
`;