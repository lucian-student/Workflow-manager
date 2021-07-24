import { gql } from '@apollo/client';

export const editProjectMutation = gql`
mutation EditProject(
    $data:EditProjectInput!,
    $project_id:Float!,
    $team_id:Float
){
    editProject(
        data:$data,
        project_id:$project_id,
        team_id:$team_id
    ){
        project_id
        name
        deadline
        status
        description
        user_id
        team_id
    }
}
`;