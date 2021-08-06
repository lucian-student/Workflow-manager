import { gql } from '@apollo/client';

export const doneTodoMutation = gql`
mutation DoneTodo(
    $done:Boolean!
    $project_id:Float!
    $todo_id:Float!
    $team_id:Float
){
    doneTodo(   
        done:$done
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