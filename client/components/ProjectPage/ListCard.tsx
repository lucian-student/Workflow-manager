import React, { useContext } from "react";
import { List } from "../../generated/apolloComponents";
import listCardStyles from './ListCard/ListCard.module.css';
import ListOptions from './ListOptions';
import CardDisplay from './CardDisplay';
import { ProjectContext } from '../../context/project';
import { CloseMenuContext } from '../../context/closeMenu';
import ListEditForm from './ListEditForm';

interface Props {
    list: List
}

function ListCard({ list }: Props): JSX.Element {

    const { role } = useContext(ProjectContext);

    const { editing, formRef } = useContext(CloseMenuContext);


    return (
        <div className={listCardStyles.list_card_wrapper}>
            <div className={listCardStyles.list_card}>
                <div ref={formRef}>
                    {!editing ? (
                        <div className={listCardStyles.card_header}>
                            <div className={listCardStyles.card_heading_wrapper}>
                                <div className={listCardStyles.card_heading}>
                                    {list.name}
                                </div>
                            </div>
                            {role ? (
                                <div className={listCardStyles.icon_wrapper}>
                                    {role <= 2 && (
                                        <ListOptions list={list} />
                                    )}
                                </div>
                            ) : (
                                <div className={listCardStyles.icon_wrapper}>
                                    <ListOptions list={list}/>
                                </div>
                            )}
                        </div>
                    ) : (
                        <ListEditForm list={list} />
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