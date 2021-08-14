import { Card, GetProjectResponse, useMoveCardMutation as useMutation } from '../../generated/apolloComponents';
import { getCardQuery } from '../../graphql/card/query/getCard';
import update from 'immutability-helper'
import { getProjectQuery } from '../../graphql/project/query/getProject';

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

            const query2 = proxy.readQuery({
                query: getProjectQuery,
                variables: {
                    project_id: Number(project_id),
                    team_id: !Number(team_id) ? null : Number(team_id)
                }
            }) as { getProject: GetProjectResponse };

            const listIndex = query2.getProject.project.lists.findIndex(l => Number(l.list_id) === Number(result.data.moveCard.list_id));
            const oldListIndex = query2.getProject.project.lists.findIndex(l => Number(l.list_id) === Number(result.data.moveCard.old_list_id));
            const cardIndex = query2.getProject.project.lists[oldListIndex].cards.findIndex(c => Number(c.card_id) === Number(result.data.moveCard.card_id));

            const copy = { ...query2.getProject.project.lists[oldListIndex].cards[cardIndex] };

            const sameListUpdate = update(query2.getProject, {
                project: {
                    lists: {
                        [listIndex]: {
                            cards: {
                                $splice: [
                                    [cardIndex, 1],
                                    [result.data.moveCard.order_index, 0, copy]
                                ]
                            }
                        }
                    }
                }
            });

            const differentListUpdate = update(query2.getProject, {
                project: {
                    lists: {
                        [oldListIndex]: {
                            cards: {
                                $splice: [
                                    [cardIndex, 1],
                                ]
                            }
                        },
                        [listIndex]: {
                            cards: {
                                $splice: [
                                    [result.data.moveCard.order_index, 0, copy]
                                ]
                            }
                        }
                    }
                }
            });

            proxy.writeQuery({
                query: getProjectQuery,
                variables: {
                    project_id: Number(project_id),
                    team_id: !Number(team_id) ? null : Number(team_id)
                },
                data: {
                    getProject: oldListIndex === listIndex ? sameListUpdate : differentListUpdate
                }
            });
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