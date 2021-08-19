import { gql } from '@apollo/client';

export const lastActiveTeamMutation = gql`
mutation LastActiveTeam(
    $team_id:Float!
){
    lastActiveTeam(
        team_id:$team_id
    )
}
`;