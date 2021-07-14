import { gql } from '@apollo/client';


export const getProjectQuery = gql`
query GetProject(
   $project_id:Float!,
   $team_id:Float
){
    getProject(
        project_id:$project_id,
        team_id:$team_id
    ){
        project_id
        name
        deadline
        status
        description
        user_id
        team_id
        lists {
        list_id
        name
        order_index
        cards {
            card_id
            name
            deadline
            description
            project_id
            list_id
            order_index
            todos {
            todo_id
            description
            name
            done
            project_id
            card_id
                }
            }   
        }
    }
}
`;