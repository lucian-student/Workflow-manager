import React, { useEffect } from 'react';
import { useDeleteTodoMutation as useMutation } from '../../generated/apolloComponents';
import { getCardQuery } from '../../graphql/card/query/getCard';
import update from 'immutability-helper'
import { getProjectQuery } from '../../graphql/project/query/getProject';

interface Props {
    project_id: string
    card_id: string
    team_id?: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export function useDeleteTodoMutation({ project_id, card_id, team_id, setOpen }: Props) {

    const [deleteTodoMutation, { data }] = useMutation({
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
                            $splice: [[query.getCard.todos.findIndex(t => Number(t.todo_id) === Number(result.data.deleteTodo.todo_id)), 1]]
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

            const listIndex = query2.getProject.project.lists
                .findIndex(l => Number(l.list_id) === Number(result.data.deleteTodo.list_id));

            const cardIndex = query2.getProject.project.lists[listIndex].cards
                .findIndex(c => Number(c.card_id) === Number(result.data.deleteTodo.card_id));

            const todoIndex = query2.getProject.project.lists[listIndex].cards[cardIndex].todos
                .findIndex(t => Number(t.todo_id) === Number(result.data.deleteTodo.todo_id));

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
                                                $splice: [[todoIndex, 1]]
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
        deleteTodoMutation
    }
}