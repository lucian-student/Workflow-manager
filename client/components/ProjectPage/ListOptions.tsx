import React from "react";
import { BsThreeDots } from 'react-icons/bs';
import listOptionsStyles from './ListOptions/ListOptions.module.css';
import { useDropDownMenu } from '../../hooks/useDropdownMenu';

function ListOptions(): JSX.Element {

    const { open, setOpen, menuRef } = useDropDownMenu();

    return (
        <div className={listOptionsStyles.list_options_wrapper} ref={menuRef}>
            <button className={listOptionsStyles.toggle_button}
                onClick={() => setOpen(old => !old)}>
                <BsThreeDots className={listOptionsStyles.icon} />
            </button>
            {open && (
                <div className={listOptionsStyles.menu}>
                    <button className={listOptionsStyles.menu_item}>
                        Add card
                    </button>
                    <button className={listOptionsStyles.menu_item}>
                        Edit list
                    </button>
                    <button className={listOptionsStyles.menu_item}>
                        Delete list
                    </button>
                </div>
            )}
        </div>
    )
}

export default ListOptions