import { gql } from '@apollo/client';

export const deleteMessageMutation = gql`
mutation DeleteMessage(
    $message_id:Float!
    $project_id:Float!
    $team_id:Float
){
    deleteMessage(
        message_id:$message_id
        project_id:$project_id
        team_id:$team_id
    ){
        message_id
        list_id
        card_id
    }
}
`;