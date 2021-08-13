import { gql } from '@apollo/client';

export const moveCardMutation = gql`
mutation MoveCard(
    $list_id:Float!
    $project_id:Float!
    $end_index:Float!
    $card_id:Float!
    $team_id:Float
){
    moveCard(
        list_id:$list_id
        project_id:$project_id
        end_index:$end_index
        card_id:$card_id
        team_id:$team_id
    ){
        list_id
        old_list_id
        card_id
        order_index
    }
}
`;