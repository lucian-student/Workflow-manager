import React, { useEffect } from 'react';
import { Project, useEditCardMutation as useMutation } from '../../generated/apolloComponents';
import { getCardQuery } from '../../graphql/card/query/getCard';
import update from 'immutability-helper'
import { getProjectQuery } from '../../graphql/project/query/getProject';


interface Props {
    project_id: string
    card_id: string
    team_id?: string
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
    project: Project
}

export function useEditCardMutation({
    project_id,
    card_id,
    team_id,
    setEditing,
    project
}: Props) {

    const [editCardMutation, editCard] = useMutation({
        onError(err) {
            console.log(err);
        },
        update(proxy, result) {
            const query = proxy.readQuery({
                query: getCardQuery,
                variables: {
                    project_id: Number(project_id),
                    card_id: Number(card_id),
                    team_id: Number(team_id)
                }
            }) as any;;

            proxy.writeQuery({
                query: getCardQuery,
                variables: {
                    project_id: Number(project_id),
                    card_id: Number(card_id),
                    team_id: Number(team_id)
                },
                data: {
                    getCard: update(query.getCard, {
                        name: { $set: result.data.editCard.name },
                        deadline: { $set: result.data.editCard.deadline },
                        description: { $set: result.data.editCard.description }
                    })
                }
            });

            const query2 = proxy.readQuery({
                query: getProjectQuery,
                variables: {
                    project_id: Number(project_id),
                    team_id: !Number(team_id) ? null : Number(team_id)
                }
            }) as any;

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
                                [project.lists.findIndex(l => Number(l.list_id) === Number(result.data.editCard.list_id))]: {
                                    cards: {
                                        $apply: cards => cards.map((item) => {
                                            if (item.card_id as string === result.data.editCard.card_id) {
                                                return {
                                                    ...item,
                                                    ...result.data.editCard
                                                }
                                            } else {
                                                return item;
                                            }
                                        })
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
        if (editCard.data) {
            setEditing(false);
        }
    }, [editCard.data]);

    return {
        editCardMutation
    }
}