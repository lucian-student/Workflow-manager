import React, { useContext } from "react";
import sortMenuStyles from './SortMenu/SortMenu.module.css';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai';
import { useDropDownMenu } from '../../hooks/useDropdownMenu';
import { ProjectSortContext } from '../../context/projectSort';

function SortMenu(): JSX.Element {

    const { open, setOpen, menuRef } = useDropDownMenu();

    const { setSortOptions, sortOptions } = useContext(ProjectSortContext);

    const orderMap = new Map<string, string>();
    orderMap.set('alphabetical', 'Alphabetical');
    orderMap.set('last_viewed', 'Last viewed');
    orderMap.set('deadline', 'Deadline');

    function changeOrder(order: string) {
        if (order === 'asc') {
            setSortOptions(old => {
                return {
                    order_param: old.order_param,
                    order: '_asc',
                    search:old.search
                }
            });
        } else if (order === 'desc') {
            setSortOptions(old => {
                return {
                    order_param: old.order_param,
                    order: '_desc',
                    search:old.search
                }
            });
        }

        setOpen(false);
    }

    function changeSort(type: string) {

        switch (type) {
            case 'alphabetical':
                setSortOptions(old => {
                    return {
                        order_param: 'alphabetical',
                        order: old.order,
                        search:old.search
                    }
                });
                break;
            case 'last_viewed':
                setSortOptions(old => {
                    return {
                        order_param: 'last_viewed',
                        order: old.order,
                        search:old.search
                    }
                });
                break;
            case 'deadline':
                setSortOptions(old => {
                    return {
                        order_param: 'deadline',
                        order: old.order,
                        search:old.search
                    }
                });
                break;
        }

        setOpen(false);
    }

    return (
        <div className={sortMenuStyles.sort_menu_wrapper} ref={menuRef}>
            <button className={sortMenuStyles.toggle_button}
                onClick={() => setOpen(old => !old)}>
                <div className={sortMenuStyles.toggle_text}>
                    <div>
                        {orderMap.get(sortOptions.order_param)}
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
                    <button className={sortMenuStyles.menu_item}
                        onClick={() => { changeSort('alphabetical') }}>
                        <AiOutlineCheck className={sortOptions.order_param === 'alphabetical'
                            ? sortMenuStyles.active_icon
                            : sortMenuStyles.disabled_icon} />
                        Alphabetical
                    </button>
                    <button className={sortMenuStyles.menu_item}
                        onClick={() => { changeSort('deadline') }}>
                        <AiOutlineCheck className={sortOptions.order_param === 'deadline'
                            ? sortMenuStyles.active_icon
                            : sortMenuStyles.disabled_icon} />
                        Deadline
                    </button>
                    <button className={sortMenuStyles.menu_item}
                        onClick={() => { changeSort('last_viewed') }}>
                        <AiOutlineCheck className={sortOptions.order_param === 'last_viewed'
                            ? sortMenuStyles.active_icon
                            : sortMenuStyles.disabled_icon} />
                        Last viewed
                    </button>
                    <button className={sortMenuStyles.menu_item_heading}>
                        <AiOutlineCheck className={sortMenuStyles.active_icon} />
                        Order
                    </button>
                    <button className={sortMenuStyles.menu_item}
                        onClick={() => { changeOrder('asc') }}>
                        <AiOutlineCheck className={sortOptions.order === '_asc'
                            ? sortMenuStyles.active_icon
                            : sortMenuStyles.disabled_icon} />
                        Ascending
                    </button>
                    <button className={sortMenuStyles.menu_item}
                        onClick={() => { changeOrder('desc') }}>
                        <AiOutlineCheck className={sortOptions.order === '_desc'
                            ? sortMenuStyles.active_icon
                            : sortMenuStyles.disabled_icon} />
                        Descending
                    </button>
                </div>
            )}
        </div>
    )
}

export default SortMenu;