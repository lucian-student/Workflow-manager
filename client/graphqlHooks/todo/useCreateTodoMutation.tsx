import React, { useEffect } from "react";
import { useCreateTodoMutation as useMutation } from '../../generated/apolloComponents';
import { getCardQuery } from '../../graphql/card/query/getCard';
import update from 'immutability-helper'
import { getProjectQuery } from '../../graphql/project/query/getProject';

interface Props {
    project_id: string
    card_id: string
    team_id?: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function useCreateTodoMutation({ project_id, card_id, setOpen, team_id }: Props) {

    const [createTodoMutation, { data }] = useMutation({
        onError(err) {
            console.log(err.message);
        },
        update(proxy, result) {
            const query = proxy.readQuery({
                query: getCardQuery,
                variables: {
                    project_id: Number(project_id),
                    card_id: Number(card_id),
                    team_id: Number(team_id)
                }
            }) as any;

            proxy.writeQuery({
                query: getCardQuery,
                variables: {
                    project_id: Number(project_id),
                    card_id: Number(card_id),
                    team_id: Number(team_id)
                },
                data: {
                    getCard: update(query.getCard, {
                        todos: {
                            $unshift: [result.data.createTodo.todo]
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
            }) as any;

            const listIndex = query2.getProject.project.lists.findIndex(l => Number(l.list_id) === Number(result.data.createTodo.list_id));
            const cardIndex = query2.getProject.project.lists[listIndex].cards.findIndex(c => Number(c.card_id) === Number(result.data.createTodo.todo.card_id));

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
                                        [cardIndex]:
                                        {
                                            todos: {
                                                $push: [result.data.createTodo.todo]
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
        createTodoMutation
    }
}