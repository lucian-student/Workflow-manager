import { useMoveCardMutation as useMutation } from '../../generated/apolloComponents';
import moveCardUpdateProject from '../../subscriptionUpdates/card/moveCardUpdateProject';

interface Props {
    project_id: string,
    team_id: string | null
}

export default function useMoveCardMutation({ project_id, team_id }: Props) {

    const [moveCardMutation] = useMutation({
        onError(err) {
            console.log(err.message);
        },
        update(proxy, result) {
            moveCardUpdateProject(result.data.moveCard, project_id, proxy, false, team_id);
        }
    });

    return {
        moveCardMutation
    }
}

/*const query = proxy.readQuery({
                query: getCardQuery,
                variables: {
                    card_id: Number(card_id),
                    project_id: Number(project_id),
                    team_id: Number(team_id)
                }
            }) as { getCard: Card };

            proxy.writeQuery({
                query: getCardQuery,
                variables: {
                    card_id: Number(card_id),
                    project_id: Number(project_id),
                    team_id: Number(team_id)
                },
                data: {
                    getCard: update(query.getCard, {

                    })
                }
            });*/