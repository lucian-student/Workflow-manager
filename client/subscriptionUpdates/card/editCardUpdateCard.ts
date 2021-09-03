import { ApolloCache, ApolloClient } from "@apollo/client";
import { Card, EditCardMutation } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getCardQuery } from '../../graphql/card/query/getCard';

export default function editCardUpdateCard(editCard: Card, project_id: string, client: ApolloClient<Object> | ApolloCache<EditCardMutation>, team_id?: string): void {
    const query = client.readQuery({
        query: getCardQuery,
        variables: {
            project_id: Number(project_id),
            card_id: Number(editCard.card_id),
            team_id: Number(team_id)
        }
    }) as { getCard: Card };

    client.writeQuery({
        query: getCardQuery,
        variables: {
            project_id: Number(project_id),
            card_id: Number(editCard.card_id),
            team_id: Number(team_id)
        },
        data: {
            getCard: update(query.getCard, {
                name: { $set: editCard.name },
                deadline: { $set: editCard.deadline },
                description: { $set: editCard.description }
            })
        }
    });
}