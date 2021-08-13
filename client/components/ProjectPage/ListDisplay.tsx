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
import { Droppable, DragDropContext } from 'react-beautiful-dnd';

interface Props {
    lists: List[]
    project_id: string
    team_id: string | null
}

function ListDisplay({ lists, project_id, team_id }: Props): JSX.Element {

    function onDragEnd() {

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
                                                <ListForm project_id={project_id} team_id={team_id} />
                                                {provided.placeholder}
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