import { gql } from '@apollo/client';

export const createTeamMutation = gql`
mutation CreateTeam(
    $data:TeamInput!
){
    createTeam(
        data:$data
    ){
      team_id
      name
      description
      last_active
      user_count
      project_count
    }
}
`;