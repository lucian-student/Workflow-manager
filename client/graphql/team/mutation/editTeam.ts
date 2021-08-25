import { gql } from '@apollo/client';

export const editTeamMutation = gql`
mutation EditTeam(
    $team_id:Float!
    $data:TeamInput!
){
    editTeam(
        team_id:$team_id
        data:$data
    ){
      team_id
      name
      description
    }
}
`;