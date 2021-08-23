import { gql } from '@apollo/client';

export const removeMemberMutation = gql`
mutation RemoveMemberFromTeam(
    $con_id:Float!
    $team_id:Float!
){
    removeMemberFromTeam(
        con_id:$con_id
        team_id:$team_id
    )
}
`;