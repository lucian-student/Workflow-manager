import React, { useContext } from "react";
import { FaUserCog } from 'react-icons/fa';
import OptionsMenuStyle from './OptionsMenu/OptionsMenu.module.css'
import { AuthContext } from '../../context/auth';

function OptionsMenu(): JSX.Element {

    const { currentUser } = useContext(AuthContext);

    return (
        <button className={OptionsMenuStyle.settings_button}>
            {(currentUser !== true && currentUser) && (
                <div  className={OptionsMenuStyle.username}>
                    {currentUser.username}
                </div>
            )}
            <FaUserCog />
        </button>
    )
}

export default OptionsMenu;