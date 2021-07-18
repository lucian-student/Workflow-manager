import { gql } from '@apollo/client';

export const createProjectMutation = gql`
    mutation CreateProject(
        $data:CreateProjectInput!,
        $team_id:Float
        ){
        createProject(
            data:$data,
            team_id:$team_id
        ){
            project_id
            name
            deadline
            status
            description
            user_id
            team_id
            last_updated
            team_name
        }
    }
`;