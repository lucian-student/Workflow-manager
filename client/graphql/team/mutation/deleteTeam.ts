import { gql } from '@apollo/client';

export const deleteTeamMutation = gql`
mutation DeleteTeam(
    $team_id:Float!
){
    deleteTeam(
        team_id:$team_id
    )
}
`;