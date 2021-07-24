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
    role
    project {
      project_id
      name
      deadline
      status
      description
      user_id
      team_id
      lists {
        project_id
        list_id
        name
        order_index
        cards {
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
            description
            done
            card_id
            project_id
          }
        }
      }
    }
  }
}
`;