import { gql } from '@apollo/client';

export const getTeamsMutation = gql`
query GetTeams{
    getTeams{
        teams{
      team_id
      name
      description
      last_active
      user_count
      project_count
        }
    }
}
`;