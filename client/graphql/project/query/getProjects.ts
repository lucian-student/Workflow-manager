import { gql } from '@apollo/client';

export const getProjectsQuery = gql`
query GetProjects(
    $sort_option:String!
    $search:String
){
    getProjects(
        sort_option:$sort_option
        search:$search
    ){
        project_id
        name
        deadline
        status
        description
        user_id
        team_id
        last_updated
        team_name
    }
}
`;