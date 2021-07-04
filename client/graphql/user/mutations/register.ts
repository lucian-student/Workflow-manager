import { gql } from '@apollo/client';

export const registerMutation = gql`
mutation Register($data:RegisterInput!){
    register(data:$data){
        user {
      user_id
      username
      email
    },
    access_token
    }
}
`;