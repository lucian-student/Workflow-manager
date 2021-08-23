import { gql } from '@apollo/client';

export const changeRoleMutation = gql`
mutation ChangeRole(
    $team_id:Float!
    $con_id:Float!
    $data:ChangeRoleInput!
){
    changeRole(
        team_id:$team_id
        con_id:$con_id
        data:$data
    ){
    con_id
    role
    }
}
`;