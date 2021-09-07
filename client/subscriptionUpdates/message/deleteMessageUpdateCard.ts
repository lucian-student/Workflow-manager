import { ApolloCache, ApolloClient } from "@apollo/client";
import { Card, DeleteMessageMutation, DeleteMessageResponse } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getCardQuery } from '../../graphql/card/query/getCard';

export default function deleteMessageUpdateCard(deleteMessage: DeleteMessageResponse, project_id: string, client: ApolloClient<Object> | ApolloCache<DeleteMessageMutation>, team_id?: string): void {

    const query = client.readQuery({
        query: getCardQuery,
        variables: {
            card_id: Number(deleteMessage.card_id),
            project_id: Number(project_id),
            team_id: Number(team_id)
        }
    }) as { getCard: Card };

    client.writeQuery({
        query: getCardQuery,
        variables: {
            card_id: Number(deleteMessage.card_id),
            project_id: Number(project_id),
            team_id: Number(team_id)
        },
        data: {
            getCard: update(query.getCard, {
                messages: {
                    $splice: [[query.getCard.messages.findIndex(m => Number(m.message_id) === Number(deleteMessage.message_id)), 1]]
                }
            })
        }
    });

}