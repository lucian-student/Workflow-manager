import React from "react";
import { FaUserCog } from 'react-icons/fa';
import OptionsMenuStyle from './OptionsMenu/OptionsMenu.module.css'
function OptionsMenu(): JSX.Element {

    return (
        <button className={OptionsMenuStyle.settings_button}>
            <FaUserCog />
        </button>
    )
}

export default OptionsMenu;