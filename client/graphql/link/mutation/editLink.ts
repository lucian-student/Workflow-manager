import { gql } from '@apollo/client';

export const editLinkMutation = gql`
mutation EditLink(
    $data:LinkInput!
    $link_id:Float!
    $project_id:Float!
    $team_id:Float
){
    editLink(
        data:$data
        link_id:$link_id
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