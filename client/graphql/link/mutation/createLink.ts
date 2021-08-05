import { gql } from '@apollo/client';

export const createLinkMutation = gql`
mutation CreateLink(
    $data:LinkInput!
    $card_id:Float!
    $project_id:Float!
    $team_id:Float
){
    createLink(
        data:$data
        card_id:$card_id
        project_id:$project_id
        team_id:$team_id
    ){
        link{
            link_id
            name
            url
            card_id
            project_id
        }
        list_id
    }
}
`;