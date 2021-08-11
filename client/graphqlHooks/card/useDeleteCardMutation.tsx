import { useEffect, useContext } from 'react';
import { GetProjectResponse, useDeleteCardMutation as useMutation } from '../../generated/apolloComponents';
import update from 'immutability-helper'
import { getProjectQuery } from '../../graphql/project/query/getProject';
import { CardViewContext } from '../../context/cardView';

interface Props {
    project_id: string
    team_id?: string
}

export function useDeleteCardMutation({ project_id, team_id }: Props) {

    const { setCard_id } = useContext(CardViewContext);

    const [deleteCardMutation, { data }] = useMutation({
        onError(err) {
            console.log(err)
        },
        update(proxy, result) {
            const query2 = proxy.readQuery({
                query: getProjectQuery,
                variables: {
                    project_id: Number(project_id),
                    team_id: !Number(team_id) ? null : Number(team_id)
                }
            }) as { getProject: GetProjectResponse };

            const listIndex = query2.getProject.project.lists.findIndex(l => Number(l.list_id) === Number(result.data.deleteCard.list_id));
            const cardIndex = query2.getProject.project.lists[listIndex].cards.findIndex(c => Number(c.card_id) === Number(result.data.deleteCard.card_id));

            proxy.writeQuery({
                query: getProjectQuery,
                variables: {
                    project_id: Number(project_id),
                    team_id: !Number(team_id) ? null : Number(team_id)
                },
                data: {
                    getProject: update(query2.getProject, {
                        project: {
                            lists: {
                                [listIndex]: {
                                    cards: {
                                        $splice: [[cardIndex, 1]]
                                    }
                                }
                            }
                        }
                    })
                }
            });
        }
    });

    useEffect(() => {
        if (data) {
            setCard_id(null);
        }
    }, [data]);

    return {
        deleteCardMutation
    }
}