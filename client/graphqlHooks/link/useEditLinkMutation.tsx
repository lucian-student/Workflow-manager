import React, { useEffect } from 'react';
import { Card, GetProjectResponse, Link, useEditLinkMutation as useMutation } from '../../generated/apolloComponents';
import { getCardQuery } from '../../graphql/card/query/getCard';
import update from 'immutability-helper'
import { getProjectQuery } from '../../graphql/project/query/getProject';

interface Props {
    project_id: string
    card_id: string
    team_id?: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function useEditLinkMutation({ project_id, card_id, team_id, setOpen }: Props) {

    const [editLinkMutation, { data }] = useMutation({
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
                        links: {
                            [query.getCard.links.findIndex(l => Number(l.link_id) === Number(result.data.editLink.link.link_id))]: {
                                $set: result.data.editLink.link as Link
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

            const listIndex = query2.getProject.project.lists.findIndex(l => Number(l.list_id) === Number(result.data.editLink.list_id));
            const cardIndex = query2.getProject.project.lists[listIndex].cards.findIndex(c => Number(c.card_id) === Number(result.data.editLink.link.card_id));

            const linkIndex = query2.getProject.project.lists[listIndex].cards[cardIndex].links
                .findIndex(l => Number(l.link_id) === Number(result.data.editLink.link.link_id));

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
                                            links: {
                                                [linkIndex]: {
                                                    $set: result.data.editLink.link as Link
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
        editLinkMutation
    }
}