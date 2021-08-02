import React from 'react';
import dayjs from 'dayjs';
import { MdDateRange, MdSubtitles, MdDescription } from 'react-icons/md';
import { Card } from '../../generated/apolloComponents';
import cardDataStyle from './CardData/CardData.module.css';

interface Props {
    card: Card
}

function CardData({ card }: Props): JSX.Element {

    return (
        <div  className={cardDataStyle.card_data_wrapper}>
            <div className={cardDataStyle.input_wrapper}>
                <div className={cardDataStyle.form_label}>
                    <MdSubtitles className={cardDataStyle.display_icon} />
                </div>
                <div className={cardDataStyle.text}>
                    <div>
                        {card.name}
                    </div>
                </div>
            </div>
            <div className={cardDataStyle.input_wrapper}>
                <div className={cardDataStyle.form_label}>
                    <MdDateRange className={cardDataStyle.display_icon} />
                </div>
                <div className={cardDataStyle.text}>
                    <div>
                        {`${dayjs(card.deadline).format('DD/MM/YYYY')}`}
                    </div>
                </div>
            </div>
            <div className={cardDataStyle.input_wrapper}>
                <div className={cardDataStyle.form_label}>
                    <MdDescription className={cardDataStyle.display_icon} />
                </div>
                <p className={cardDataStyle.description}>
                    {card.description}
                </p>
            </div>
        </div>
    )
}

export default CardData;