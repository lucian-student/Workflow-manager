import React, { useContext } from "react";
import { List } from "../../generated/apolloComponents";
import listCardStyles from './ListCard/ListCard.module.css';
import ListOptions from './ListOptions';
import CardDisplay from './CardDisplay';
import { ProjectContext } from '../../context/project';
import { Fragment } from "react";

interface Props {
    list: List
}

function ListCard({ list }: Props): JSX.Element {

    const { role } = useContext(ProjectContext);
    console.log(role);

    return (
        <div className={listCardStyles.list_card_wrapper}>
            <div className={listCardStyles.list_card}>
                <div className={listCardStyles.card_header}>
                    <div className={listCardStyles.card_heading_wrapper}>
                        <div className={listCardStyles.card_heading}>
                            {list.name}
                        </div>
                    </div>
                    {role ? (
                        <Fragment>
                            {role <= 2 && (
                                <ListOptions />
                            )}
                        </Fragment>
                    ) : (
                        <ListOptions />
                    )}
                </div>
                <div className={listCardStyles.card_body}>
                    <CardDisplay cards={list.cards} />
                </div>
            </div>
        </div>
    )
}

export default ListCard;