import { gql } from '@apollo/client';

export const editCardMutation = gql`
mutation EditCard(
    $data:CardInput!
    $card_id:Float!
    $project_id:Float!
    $team_id:Float
){
    editCard(
        data:$data
        card_id:$card_id
        project_id:$project_id
        team_id:$team_id
    ){
        project_id
        card_id
        list_id
        name
        description
        deadline
    }
}
`;