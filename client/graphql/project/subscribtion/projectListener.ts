import { gql } from '@apollo/client';

export const projectListenerSubscription = gql`
subscription ProjectListener(
    $project_id:Float!
    $team_id:Float!
){
    projectListener(
        project_id:$project_id
        team_id:$team_id
    ){
        project_id
        topic 
        editProject{
            project_id
            name
            deadline
            status
            description
            user_id
            team_id
        }
        deleteCard{
            card_id
            list_id
        }
        editCard{
            project_id
            card_id
            list_id
            name
            description
            deadline
        }
    }
}
`;