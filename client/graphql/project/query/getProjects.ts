import { gql } from '@apollo/client';

export const getProjectQuery = gql`
query GetProjects{
    getProjects{
        project_id
        name
        deadline
        status
        description
        user_id
        team_id
        last_updated
    }
}
`;