import { ApolloCache, ApolloClient } from "@apollo/client";
import { GetProjectResponse, MoveCardMutation, MoveCardResponse } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getProjectQuery } from '../../graphql/project/query/getProject';

export default function moveCardUpdate(moveCard: MoveCardResponse, project_id: string, client: ApolloClient<Object> | ApolloCache<MoveCardMutation>, subscribtion: boolean, team_id?: string): void {

    try {
        const query2 = client.readQuery({
            query: getProjectQuery,
            variables: {
                project_id: Number(project_id),
                team_id: Number(team_id)
            }
        }) as { getProject: GetProjectResponse };

        const listIndex = query2.getProject.project.lists.findIndex(l => Number(l.list_id) === Number(moveCard.list_id));
        const oldListIndex = query2.getProject.project.lists.findIndex(l => Number(l.list_id) === Number(moveCard.old_list_id));
        const cardIndex = query2.getProject.project.lists[oldListIndex].cards.findIndex(c => Number(c.card_id) === Number(moveCard.card_id));

        /*console.log(moveCard);

        console.log(listIndex);
        console.log(oldListIndex);
        console.log(cardIndex);*/

        if (subscribtion) {
            if (!query2.getProject.project.lists[oldListIndex].cards[cardIndex]) {
                //console.log('1');
                return;
            }

            if (query2.getProject.project.lists[oldListIndex].cards[cardIndex].card_id !== moveCard.card_id) {
                //console.log('2');
                return;
            }

            if (query2.getProject.project.lists[listIndex].cards[moveCard.order_index].card_id === moveCard.card_id) {
                //console.log('3');
                return;
            }
            // console.log('4');
        }

        const copy = { ...query2.getProject.project.lists[oldListIndex].cards[cardIndex] };

        const sameListUpdate = update(query2.getProject, {
            project: {
                lists: {
                    [listIndex]: {
                        cards: {
                            $splice: [
                                [cardIndex, 1],
                                [moveCard.order_index, 0, copy]
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
                                [moveCard.order_index, 0, copy]
                            ]
                        }
                    }
                }
            }
        });

        client.writeQuery({
            query: getProjectQuery,
            variables: {
                project_id: Number(project_id),
                team_id: Number(team_id)
            },
            data: {
                getProject: oldListIndex === listIndex ? sameListUpdate : differentListUpdate
            }
        });

    } catch (error) {
        console.log(error.message);
        console.log(subscribtion);
    }

}