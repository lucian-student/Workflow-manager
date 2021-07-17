import React from "react";
import { List } from "../../generated/apolloComponents";
import listCardStyles from './ListCard/ListCard.module.css';
import ListOptions from './ListOptions';
import CardDisplay from './CardDisplay';

interface Props {
    list: List
}

function ListCard({ list }: Props): JSX.Element {

    return (
        <div className={listCardStyles.list_card_wrapper}>
            <div className={listCardStyles.list_card}>
                <div className={listCardStyles.card_header}>
                    <div className={listCardStyles.card_heading}>
                        {list.name}
                    </div>
                    <ListOptions />
                </div>
                <div className={listCardStyles.card_body}>
                    <CardDisplay cards={list.cards} />
                </div>
            </div>
        </div>
    )
}

export default ListCard;