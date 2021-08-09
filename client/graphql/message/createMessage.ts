import { gql } from '@apollo/client';

export const createMessageMutation = gql`
mutation CreateMessage(
    $data:MessageInput!
    $project_id:Float!
    $card_id:Float!
    $team_id:Float
){
    createMessage(
        data:$data
        project_id:$project_id
        card_id:$card_id
        team_id:$team_id
    ){
        message {
            message_id
            content
            user_id
            card_id
            project_id
            data_of_creation
            username
          }
        list_id
    }
}
`;