import { gql } from '@apollo/client';

export const getTeamMembersQuery = gql`
query GetTeamMembers(
    $team_id:Float!
    $sort_option:String!
    $search:String
){
    getTeamMembers(
        team_id:$team_id
        sort_option:$sort_option
        search:$search
    ){
        team_id
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