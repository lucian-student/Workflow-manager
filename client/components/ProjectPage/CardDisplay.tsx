import React from "react";
import { Card } from '../../generated/apolloComponents';
import CardCard from './Card';
import cardDisplayStyles from './CardDisplay/CardDisplay.module.css';
import { CardContextProvider } from '../../context/card';

interface Props {
    cards: Card[]
}

function CardDisplay({ cards }: Props): JSX.Element {

    return (
        <div className={cardDisplayStyles.card_display}>
            <CardContextProvider>
                {cards.map(card => (
                    <CardCard card={card} />
                ))}
            </CardContextProvider>
        </div>
    )
}

export default CardDisplay;