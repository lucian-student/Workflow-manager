import { gql } from '@apollo/client';

export const deleteProjectMutation = gql`
mutation DeleteProject(
    $project_id:Float!,
    $team_id:Float
){
    deleteProject(
        project_id:$project_id,
        team_id:$team_id
    )
}
`;