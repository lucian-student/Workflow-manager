import { gql } from '@apollo/client';

export const sendUserTeamConnectionMutation = gql`
mutation SendUserTeamConnection(
    $team_id:Float!
    $data:UserTeamConnectionInput!
){
    sendUserTeamConnection(
        team_id:$team_id
        data:$data
    )
}
`;