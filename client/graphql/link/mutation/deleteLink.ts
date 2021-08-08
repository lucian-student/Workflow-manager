import { gql } from '@apollo/client';

export const deleteLinkMutation = gql`
mutation DeleteLink(
    $link_id:Float!
    $project_id:Float!
    $team_id:Float
){
    deleteLink(
        link_id:$link_id
        project_id:$project_id
        team_id:$team_id
    ){
        list_id
        link_id
        card_id
    }
}
`;