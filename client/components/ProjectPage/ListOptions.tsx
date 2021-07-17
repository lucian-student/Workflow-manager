import React from "react";
import { BsThreeDots } from 'react-icons/bs';
import listOptionsStyles from './ListOptions/ListOptions.module.css';

function ListOptions(): JSX.Element {

    return (
            <button className={listOptionsStyles.toggle_button}>
                <BsThreeDots className={listOptionsStyles.icon} />
            </button>
    )
}

export default ListOptions