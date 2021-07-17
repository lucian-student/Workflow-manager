import React from "react";
import { List } from '../../generated/apolloComponents';
import listDisplayStyles from './ListDisplay/ListDisplay.module.css';
import ListCard from './ListCard';
import ListForm from './ListForm';

interface Props {
    lists: List[]
}

function ListDisplay({ lists }: Props): JSX.Element {

    return (
        <div className={listDisplayStyles.list_display_wrapper}>
            {lists.map(list => (
                <ListCard key={list.list_id} list={list} />
            ))}
            <ListForm />
        </div>
    )
}


export default ListDisplay;