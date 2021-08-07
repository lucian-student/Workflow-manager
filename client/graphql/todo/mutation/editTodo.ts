import { gql } from '@apollo/client';

export const editTodoMutation = gql`
mutation EditTodo(
    $data:TodoInput!
    $project_id:Float!
    $todo_id:Float!
    $team_id:Float
){
    editTodo(
        data:$data
        project_id:$project_id
        todo_id:$todo_id
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