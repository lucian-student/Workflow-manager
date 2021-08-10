import { gql } from '@apollo/client';

export const editMessageMutation = gql`
mutation EditMessage(
    $data:MessageInput!
    $message_id:Float!
    $project_id:Float!
    $team_id:Float
){
    editMessage(
        data:$data
        message_id:$message_id
        project_id:$project_id
        team_id:$team_id
    ){
        message{
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