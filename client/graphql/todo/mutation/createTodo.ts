import { gql } from '@apollo/client';

export const createTodo = gql`
mutation CreateTodo(
    $data:TodoInput!
    $project_id:Float!
    $card_id:Float!
    $team_id:Float
){
    createTodo(
        data:$data
        project_id:$project_id
        card_id:$card_id
        team_id:$team_id
    ){  
        todo{
            todo_id
            name
            done
            card_id
            project_id
        }
        list_id
    }
}
`;