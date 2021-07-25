import React from "react";
import { List } from '../../generated/apolloComponents';
import listDisplayStyles from './ListDisplay/ListDisplay.module.css';
import ListCard from './ListCard';
import ListForm from './ListForm';
import { CloseMenuContextProvider } from '../../context/closeMenu';
import { CardAddContextProvider } from '../../context/cardAdd';
import CardForm from './CardForm';
import { Fragment } from "react";

interface Props {
    lists: List[]
    project_id: string
    team_id: string | null
}

function ListDisplay({ lists, project_id, team_id }: Props): JSX.Element {

    return (
        <div className={listDisplayStyles.list_display_wrapper}>
            <CardAddContextProvider>
                {(list_id) => (
                    <Fragment>
                        {list_id && (
                            <CardForm />
                        )}
                        {lists.map(list => (
                            <CloseMenuContextProvider key={list.list_id}>
                                <ListCard list={list} />
                            </CloseMenuContextProvider>
                        ))}
                        <ListForm project_id={project_id} team_id={team_id} />
                    </Fragment>
                )}
            </CardAddContextProvider>
        </div>
    )
}


export default ListDisplay;