import { gql } from '@apollo/client';

export const leaveTeamMutation = gql`
mutation LeaveTeam(
    $team_id:Float!
){
    leaveTeam(
        team_id:$team_id
    )
}
`;