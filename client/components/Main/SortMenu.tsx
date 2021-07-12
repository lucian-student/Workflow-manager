import React from "react";
import sortMenuStyles from './SortMenu/SortMenu.module.css';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai';
import { useDropDownMenu } from '../../hooks/useDropdownMenu';
function SortMenu(): JSX.Element {

    const { open, setOpen, menuRef } = useDropDownMenu();


    function changeOrder(order: string) {
        setOpen(false);
    }

    function changeSort(type: string) {
        setOpen(false);
    }



    return (
        <div className={sortMenuStyles.sort_menu_wrapper} ref={menuRef}>
            <button className={sortMenuStyles.toggle_button}
                onClick={() => setOpen(old => !old)}>
                <div className={sortMenuStyles.toggle_text}>
                    <div>
                        latest viewed
                    </div>
                    <div className={open ? sortMenuStyles.toggle_icon : ''}>
                        <IoMdArrowDropdown />
                    </div>
                </div>
            </button>
            {open && (
                <div className={sortMenuStyles.menu}>
                    <button className={sortMenuStyles.menu_item_heading}>
                        <AiOutlineCheck className={sortMenuStyles.active_icon} />
                        Sorted by
                    </button>
                    <button className={sortMenuStyles.menu_item}>
                        <AiOutlineCheck className={sortMenuStyles.active_icon} />
                        Alphabetical
                    </button>
                    <button className={sortMenuStyles.menu_item}>
                        <AiOutlineCheck className={sortMenuStyles.active_icon} />
                        Date created
                    </button>
                    <button className={sortMenuStyles.menu_item}>
                        <AiOutlineCheck className={sortMenuStyles.active_icon} />
                        Last viewed
                    </button>
                    <button className={sortMenuStyles.menu_item_heading}>
                        <AiOutlineCheck className={sortMenuStyles.active_icon} />
                        Order
                    </button>
                    <button className={sortMenuStyles.menu_item}>
                        <AiOutlineCheck className={sortMenuStyles.active_icon} />
                        Ascending
                    </button>
                    <button className={sortMenuStyles.menu_item}>
                        <AiOutlineCheck className={sortMenuStyles.active_icon} />
                        Descending
                    </button>
                </div>
            )}
        </div>
    )
}

export default SortMenu;