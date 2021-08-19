import { gql } from '@apollo/client';

export const lastViewedProjectMutation = gql`
mutation LastViewedProject(
    $project_id:Float!
    $team_id:Float
){
    lastViewedProject(
        project_id:$project_id
        team_id:$team_id
    )
}
`;