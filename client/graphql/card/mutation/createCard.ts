import { gql } from '@apollo/client';

export const createCardMutation = gql`
mutation CreateCard(
    $data:CreateCardInput!
    $list_id:Float!
    $project_id:Float!
    $team_id:Float
){
    createCard(
        data:$data
        list_id:$list_id
        project_id:$project_id
        team_id:$team_id
    ){
          card_id
          name
          deadline
          project_id
          list_id
          order_index
          links {
            link_id
            name
            url
            card_id
            project_id
          }
          messages {
            message_id
            content
            user_id
            card_id
            project_id
            data_of_creation
            username
          }
          todos {
            todo_id
            name
            done
            card_id
            project_id
          }
        }
}
`;