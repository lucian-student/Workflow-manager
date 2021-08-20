import { gql } from '@apollo/client';

export const getTeamInvitationsQuery = gql`
query GetTeamInvitations{
    getTeamInvitations{
        user_id
        cons{
        con_id
        user_id
        team_id
        teamname
        confirmed
        role
      }
    }
}
`;