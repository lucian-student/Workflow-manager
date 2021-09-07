import { ApolloCache, ApolloClient } from "@apollo/client";
import { Card, CreateMessageMutation, MessageResponse } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getCardQuery } from '../../graphql/card/query/getCard';

export default function createMessageUpdateCard(createMessage: MessageResponse, project_id: string, client: ApolloClient<Object> | ApolloCache<CreateMessageMutation>, team_id?: string): void {

    const query = client.readQuery({
        query: getCardQuery,
        variables: {
            card_id: Number(createMessage.message.card_id),
            project_id: Number(project_id),
            team_id: Number(team_id)
        }
    }) as { getCard: Card };

    client.writeQuery({
        query: getCardQuery,
        variables: {
            card_id: Number(createMessage.message.card_id),
            project_id: Number(project_id),
            team_id: Number(team_id)
        },
        data: {
            getCard: update(query.getCard, {
                messages: {
                    $unshift: [createMessage.message]
                }
            })
        }
    });

}