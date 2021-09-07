import { ApolloCache, ApolloClient } from "@apollo/client";
import { Card, EditMessageMutation, MessageResponse } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getCardQuery } from '../../graphql/card/query/getCard';

export default function editMessageUpdateCard(editMessage: MessageResponse, project_id: string, client: ApolloClient<Object> | ApolloCache<EditMessageMutation>, team_id?: string): void {

    const query = client.readQuery({
        query: getCardQuery,
        variables: {
            card_id: Number(editMessage.message.card_id),
            project_id: Number(project_id),
            team_id: Number(team_id)
        }
    }) as { getCard: Card };

    client.writeQuery({
        query: getCardQuery,
        variables: {
            card_id: Number(editMessage.message.card_id),
            project_id: Number(project_id),
            team_id: Number(team_id)
        },
        data: {
            getCard: update(query.getCard, {
                messages: {
                    [query.getCard.messages.findIndex(m => Number(m.message_id) === Number(editMessage.message.message_id))]: {
                        $apply: (m) => {
                            return {
                                ...editMessage.message,
                                username: m.username
                            } 
                        }
                    }
                }
            })
        }
    });

}