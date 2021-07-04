import { gql } from '@apollo/client';

export const meQuery = gql`
    query Me{
        me{
            user_id
            username
            email
        }
    }
`;