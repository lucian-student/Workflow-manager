import { ApolloCache, ApolloClient } from "@apollo/client";
import { Card, DeleteLinkMutation, DeleteLinkResponse } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getCardQuery } from '../../graphql/card/query/getCard';

export default function deleteLinkUpdateCard(deleteLink: DeleteLinkResponse, project_id: string, client: ApolloClient<Object> | ApolloCache<DeleteLinkMutation>, team_id?: string): void {
    const query = client.readQuery({
        query: getCardQuery,
        variables: {
            card_id: Number(deleteLink.card_id),
            project_id: Number(project_id),
            team_id: Number(team_id)
        }
    }) as { getCard: Card };

    client.writeQuery({
        query: getCardQuery,
        variables: {
            card_id: Number(deleteLink.card_id),
            project_id: Number(project_id),
            team_id: Number(team_id)
        },
        data: {
            getCard: update(query.getCard, {
                links: {
                    $splice: [[query.getCard.links.findIndex(l => Number(l.link_id) === Number(deleteLink.link_id)), 1]]
                }
            })
        }
    });
}