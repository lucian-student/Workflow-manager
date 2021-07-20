import React from "react";
import { List } from '../../generated/apolloComponents';
import listDisplayStyles from './ListDisplay/ListDisplay.module.css';
import ListCard from './ListCard';
import ListForm from './ListForm';

interface Props {
    lists: List[]
    project_id: string
    team_id: string | null
}

function ListDisplay({ lists, project_id, team_id }: Props): JSX.Element {

    return (
        <div className={listDisplayStyles.list_display_wrapper}>
            {lists.map(list => (
                <ListCard key={list.list_id} list={list} />
            ))}
            <ListForm project_id={project_id} team_id={team_id} />
        </div>
    )
}


export default ListDisplay;