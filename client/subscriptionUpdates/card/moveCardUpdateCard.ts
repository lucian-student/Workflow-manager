import { ApolloCache, ApolloClient } from "@apollo/client";
import { Card, MoveCardMutation, MoveCardResponse } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getCardQuery } from '../../graphql/card/query/getCard';

export default function moveCardUpdateCard(moveCard: MoveCardResponse, project_id: string, client: ApolloClient<Object> | ApolloCache<MoveCardMutation>, team_id?: string): void {
    
    const query = client.readQuery({
        query: getCardQuery,
        variables: {
            project_id: Number(project_id),
            card_id: Number(moveCard.card_id),
            team_id: Number(team_id)
        }
    }) as { getCard: Card };


    client.writeQuery({
        query: getCardQuery,
        variables: {
            project_id: Number(project_id),
            card_id: Number(moveCard.card_id),
            team_id: Number(team_id)
        },
        data: {
            getCard: update(query.getCard, {
                list_id: {
                    $set: moveCard.list_id
                }
            })
        }
    });

}