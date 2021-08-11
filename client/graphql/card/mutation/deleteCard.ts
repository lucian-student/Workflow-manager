import { gql } from '@apollo/client';

export const deleteCardMutation = gql`
mutation DeleteCard(
    $card_id:Float!
    $project_id:Float!
    $team_id:Float
){
    deleteCard(
        card_id:$card_id
        project_id:$project_id
        team_id:$team_id
    ){
        card_id
        list_id
    }
}
`;