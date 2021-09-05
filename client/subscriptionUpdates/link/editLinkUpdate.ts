import { ApolloCache, ApolloClient } from "@apollo/client";
import { Card, LinkResponse, EditLinkMutation } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getCardQuery } from '../../graphql/card/query/getCard';


export default function editLinkUpdatecreateLink(editLink: LinkResponse, project_id: string, client: ApolloClient<Object> | ApolloCache<EditLinkMutation>, team_id?: string): void {
    const query = client.readQuery({
        query: getCardQuery,
        variables: {
            card_id: Number(editLink.link.card_id),
            project_id: Number(project_id),
            team_id: Number(team_id)
        }
    }) as { getCard: Card };

    client.writeQuery({
        query: getCardQuery,
        variables: {
            card_id: Number(editLink.link.card_id),
            project_id: Number(project_id),
            team_id: Number(team_id)
        },
        data: {
            getCard: update(query.getCard, {
                links: {
                    [query.getCard.links.findIndex(l => Number(l.link_id) === Number(editLink.link.link_id))]: {
                        $merge: editLink.link
                    }
                }
            })
        }
    });
}