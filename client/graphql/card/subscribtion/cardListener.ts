import { gql } from '@apollo/client';

export const cardListenerSubscribtion = gql`
subscription CardListener(
    $card_id:Float!
    $team_id:Float!
    $project_id:Float!
){
    cardListener(
        card_id:$card_id
        team_id:$team_id
        project_id:$project_id
    ){
        project_id
        topic
        deleteCard{
            card_id
            list_id
        }
        editCard{
            project_id
            card_id
            list_id
            name
            description
            deadline
        }
        createLink{
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
}
`;