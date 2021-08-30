import { gql } from '@apollo/client';

export const projectListenerSubscription = gql`
subscription ProjectListener(
    $project_id:Float!
    $team_id:Float
){
    projectListener(
        project_id:$project_id
        team_id:$team_id
    )
}
`;