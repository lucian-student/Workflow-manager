import { gql } from '@apollo/client';

export const removeTodoMutation = gql`
mutation DeleteTodo(

){
    deleteTodo(

    ){
      todo_id
      list_id
    }
}
`;