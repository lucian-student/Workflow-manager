import React, { useEffect } from 'react';
import { Message, Card, GetProjectResponse, useEditMessageMutation as useMutatation } from '../../generated/apolloComponents';
import { getCardQuery } from '../../graphql/card/query/getCard';
import update from 'immutability-helper'
import { getProjectQuery } from '../../graphql/project/query/getProject';


interface Props {
    project_id: string
    card_id: string
    team_id?: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function useEditMessageMutation({ project_id, card_id, team_id, setOpen }: Props) {

    const [editMessageMutation, { data }] = useMutatation({
        onError(err) {
            console.log(err);
        },
        update(proxy, result) {
            const query = proxy.readQuery({
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
                        messages: {
                            [query.getCard.messages.findIndex(m => Number(m.message_id) === Number(result.data.editMessage.message.message_id))]: {
                                $apply: (m) => {
                                    return {
                                        ...result.data.editMessage.message,
                                        username: m.username
                                    } as Message
                                }
                            }
                        }
                    })
                }
            });

            const query2 = proxy.readQuery({
                query: getProjectQuery,
                variables: {
                    project_id: Number(project_id),
                    team_id: !Number(team_id) ? null : Number(team_id)
                }
            }) as { getProject: GetProjectResponse };

            const listIndex = query2.getProject.project.lists.findIndex(l => Number(l.list_id) === Number(result.data.editMessage.list_id));
            const cardIndex = query2.getProject.project.lists[listIndex].cards.findIndex(c => Number(c.card_id) === Number(result.data.editMessage.message.card_id));

            const messageIndex = query2.getProject.project.lists[listIndex].cards[cardIndex].messages
                .findIndex(m => Number(m.message_id) === Number(result.data.editMessage.message.message_id));

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
                                        [cardIndex]: {
                                            messages: {
                                                [messageIndex]: {
                                                    $apply: (m) => {
                                                        return {
                                                            ...result.data.editMessage.message,
                                                            username: m.username
                                                        } as Message
                                                    }
                                                }
                                            }
                                        }
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
            setOpen(false);
        }
    }, [data]);

    return {
        editMessageMutation
    }
}