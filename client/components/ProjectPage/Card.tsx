import React, { useContext } from "react";
import { Card as CardType } from "../../generated/apolloComponents";
import cardStyles from './Card/Card.module.css';
import dayjs from 'dayjs';
import { RiTodoLine } from 'react-icons/ri';
import { TiMessages } from 'react-icons/ti';
import { BsLink45Deg } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { CardViewContext } from '../../context/cardView';
import { DraggableProvided } from 'react-beautiful-dnd';

interface Props {
    card: CardType
    provided: DraggableProvided
}

function Card({ card, provided }: Props): JSX.Element {

    const { setOpen, setCard_id } = useContext(CardViewContext);

    function todoDone(): string {
        const todo_count = card.todos.length;
        let todo_done = 0;

        card.todos.forEach(todo => {
            if (todo.done) {
                todo_done += 1;
            }
        })

        return todo_done + '/' + todo_count;
    }


    return (
        <div className={cardStyles.card} onClick={() => { setCard_id(card.card_id); setOpen(true) }}
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}>
            <div className={cardStyles.edit_icon_wrapper}>
                <AiOutlineEdit className={cardStyles.edit_icon} />
            </div>
            <div className={cardStyles.card_header}>
                <div className={cardStyles.card_heading}>
                    {card.name}
                </div>
                <div className={cardStyles.card_heading}>
                    {dayjs(card.deadline).format('DD/MM/YYYY')}
                </div>
            </div>
            <div className={cardStyles.card_body}>
                <div className={cardStyles.icon_data}>
                    <RiTodoLine />
                    {todoDone()}
                </div>
                <div className={cardStyles.icon_data}>
                    <TiMessages />
                    {card.messages.length}
                </div>
                <div className={cardStyles.icon_data}>
                    <BsLink45Deg />
                    {card.links.length}
                </div>
            </div>
        </div>
    )
}

export default Card;