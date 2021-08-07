import { gql } from '@apollo/client';

export const removeTodoMutation = gql`
mutation DeleteTodo(
    $project_id:Float!
    $todo_id:Float!
    $team_id:Float
){
    deleteTodo(
        project_id:$project_id
        todo_id:$todo_id
        team_id:$team_id
    ){
      todo_id
      list_id
      card_id
    }
}
`;