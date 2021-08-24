import { gql } from '@apollo/client';

export const acceptUserTeamConnectionMutation = gql`
mutation AcceptUserTeamConnection(
    $con_id:Float!
){
    acceptUserTeamConnection(
        con_id:$con_id
    )
}
`;