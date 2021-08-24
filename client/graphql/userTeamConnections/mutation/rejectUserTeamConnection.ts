import { gql } from '@apollo/client';

export const rejectUserTeamConnectionMutation = gql`
mutation RejectUserTeamConnection(
    $con_id:Float!
){
    rejectUserTeamConnection(
        con_id:$con_id
    )
}
`;