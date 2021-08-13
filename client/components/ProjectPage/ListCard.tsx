import React, { useContext, useState } from "react";
import { List } from "../../generated/apolloComponents";
import listCardStyles from './ListCard/ListCard.module.css';
import ListOptions from './ListOptions';
import CardDisplay from './CardDisplay';
import { ProjectContext } from '../../context/project';
import { CloseMenuContext } from '../../context/closeMenu';
import ListEditForm from './ListEditForm';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
    list: List
    index: number
}

function ListCard({ list, index }: Props): JSX.Element {

    const { role } = useContext(ProjectContext);

    const { editing, formRef } = useContext(CloseMenuContext);

    const [open, setOpen] = useState<boolean>(false);

    return (
        <Draggable key={`list${list.list_id}`} draggableId={`list${list.list_id}`} index={index}>
            {provided => (
                <div className={listCardStyles.list_card_wrapper}
                    {...provided.draggableProps}
                    ref={provided.innerRef}>
                    <div className={listCardStyles.list_card}>
                        <div ref={formRef}>
                            {!editing ? (
                                <div className={listCardStyles.card_header} {...provided.dragHandleProps}>
                                    <div className={listCardStyles.card_heading_wrapper}>
                                        <div className={listCardStyles.card_heading}>
                                            {list.name}
                                        </div>
                                    </div>
                                    {role ? (
                                        <div className={listCardStyles.icon_wrapper}>
                                            {role <= 2 && (
                                                <ListOptions open={open} setOpen={setOpen} list={list} />
                                            )}
                                        </div>
                                    ) : (
                                        <div className={listCardStyles.icon_wrapper}>
                                            <ListOptions open={open} setOpen={setOpen} list={list} />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <ListEditForm list={list} />
                            )}
                        </div>
                        <div className={listCardStyles.card_body}>
                            <CardDisplay cards={list.cards} list_id={list.list_id}/>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default ListCard;