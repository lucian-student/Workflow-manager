import React from "react";
import { List } from '../../generated/apolloComponents';
import listDisplayStyles from './ListDisplay/ListDisplay.module.css';
import ListCard from './ListCard';
import ListForm from './ListForm';
import { CloseMenuContextProvider } from '../../context/closeMenu';
import { CardAddContextProvider } from '../../context/cardAdd';
import CardForm from './CardForm';
import { CardViewContextProvider } from '../../context/cardView';
import CardView from "./CardView";
import { MenuContextProvider } from '../../context/menu';
import { ManagerContextProvider } from '../../context/manager';
import { Fragment } from "react";
import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import useMoveListMutation from '../../graphqlHooks/list/useMoveListMutation';
import useMoveCardMutation from '../../graphqlHooks/card/useMoveCardMutation';

interface Props {
    lists: List[]
    project_id: string
    team_id: string | null
}

function ListDisplay({ lists, project_id, team_id }: Props): JSX.Element {

    const { moveListMutation } = useMoveListMutation({
        project_id,
        team_id
    });

    const { moveCardMutation } = useMoveCardMutation({
        project_id,
        team_id
    });

    function onDragEnd(result: DropResult) {

        const { draggableId, destination, source, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const end_index = destination.index;

        if (type === 'list') {
            const list_id = draggableId.split('list')[1];

            moveListMutation({
                variables: {
                    list_id: Number(list_id),
                    end_index,
                    project_id: Number(project_id),
                    team_id: Number(team_id)
                },
                optimisticResponse: {
                    moveList: {
                        __typename: 'MoveListResponse',
                        list_id,
                        order_index: end_index
                    }
                }
            });
        }

        if (type === 'card') {
            const card_id = draggableId.split('card')[1];
            const list_id = destination.droppableId.split('cards')[1];
            const old_list_id = source.droppableId.split('cards')[1];

            moveCardMutation({
                variables: {
                    card_id: Number(card_id),
                    list_id: Number(list_id),
                    end_index,
                    project_id: Number(project_id),
                    team_id: Number(team_id)
                },
                optimisticResponse: {
                    moveCard: {
                        __typename: 'MoveCardResponse',
                        list_id,
                        card_id,
                        old_list_id,
                        order_index: end_index
                    }
                }
            });

        }
    }

    return (
        <ManagerContextProvider>
            <CardAddContextProvider>
                {(list_id) => (
                    <CardViewContextProvider>
                        {(card_id) => (
                            <MenuContextProvider>
                                {(() => {
                                    if (card_id) {
                                        return <CardView />
                                    } else if (list_id) {
                                        return <CardForm />
                                    } else {
                                        return (
                                            <Fragment>
                                            </Fragment>
                                        )
                                    }
                                })()}
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable direction={"horizontal"} droppableId={'lists'} type='list'>
                                        {provided => (
                                            <div className={listDisplayStyles.list_display_wrapper}
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}>
                                                {lists.map((list, index) => (
                                                    <CloseMenuContextProvider key={list.list_id}>
                                                        <ListCard list={list} index={index} />
                                                    </CloseMenuContextProvider>
                                                ))}
                                                {provided.placeholder}
                                                <ListForm project_id={project_id} team_id={team_id} />
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </MenuContextProvider>
                        )}
                    </CardViewContextProvider>
                )}
            </CardAddContextProvider>
        </ManagerContextProvider>

    )
}


export default ListDisplay;