import React from "react";
import { Card } from '../../generated/apolloComponents';
import CardCard from './Card';
import cardDisplayStyles from './CardDisplay/CardDisplay.module.css';
import { Droppable, Draggable } from 'react-beautiful-dnd';
interface Props {
    cards: Card[]
    list_id: string
}

function CardDisplay({ cards,list_id }: Props): JSX.Element {

    return (
        <Droppable droppableId={`cards${list_id}`} type={`card`}>
            {provided => (
                <div className={cardDisplayStyles.card_display}
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {cards.map((card, index) => (
                        <Draggable draggableId={`card${card.card_id}`} key={`card${card.card_id}`} index={index}>
                            {props => (
                                <CardCard card={card} provided={props} />
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default CardDisplay;