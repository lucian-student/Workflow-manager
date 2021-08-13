import { gql } from '@apollo/client';

export const moveListMutation = gql`
mutation MoveList(
    $list_id:Float!
    $project_id:Float!
    $end_index:Float!
    $team_id:Float
){
    moveList(
        list_id:$list_id
        project_id:$project_id
        end_index:$end_index
        team_id:$team_id
    ){
        order_index
        list_id
    }
}
`;