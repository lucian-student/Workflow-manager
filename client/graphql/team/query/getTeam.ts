import { gql } from '@apollo/client';

export const getTeamQuery = gql`
query GetTeam(
    $team_id:Float!
){
    getTeam(
        team_id:$team_id
    ){
      team_id
      name
      description
      last_active
      cons{
        con_id
        user_id
        username
        team_id
        confirmed
        role
      }
    }
}
`;