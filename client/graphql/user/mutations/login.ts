import { gql } from '@apollo/client';

export const loginMutation = gql`
    mutation Login($email:String!,$password:String!){
        login(email:$email,password:$password){
                    user {
            user_id
            email
            username
            }
            access_token
        }
    }
`;