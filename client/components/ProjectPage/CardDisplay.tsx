import React from "react";
import { Card } from '../../generated/apolloComponents';
import CardCard from './Card';
import cardDisplayStyles from './CardDisplay/CardDisplay.module.css';

interface Props {
    cards: Card[]
}

function CardDisplay({ cards }: Props): JSX.Element {

    return (
        <div className={cardDisplayStyles.card_display}>
            {cards.map(card => (
                <CardCard card={card} key={card.card_id} />
            ))}
        </div>
    )
}

export default CardDisplay;