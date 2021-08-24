import React from 'react';
import roleSelectStyles from './RoleSelect/RoleSelect.module.css';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';

interface Props {
    openSelect: boolean
    setOpenSelect: React.Dispatch<React.SetStateAction<boolean>>
    currRole: 'Owner' | 'Admin' | 'Member'| 'unknown'
    setCurrRole: React.Dispatch<React.SetStateAction<'Owner' | 'Admin' | 'Member' | 'unknown'>>
}

function RoleSelect({ openSelect, setOpenSelect, currRole, setCurrRole }: Props): JSX.Element {

    const { menuRef } = useDropdownCustom({ setOpen: setOpenSelect });

    return (
        <div className={roleSelectStyles.sort_menu_wrapper} ref={menuRef}>
            <button
                type='button'
                className={roleSelectStyles.toggle_button}
                onClick={() => { setOpenSelect(old => !old) }}>
                <div className={roleSelectStyles.toggle_text}>
                    <div>
                        {currRole}
                    </div>
                    <div className={openSelect ? roleSelectStyles.toggle_icon : ''}>
                        <IoMdArrowDropdown />
                    </div>
                </div>
            </button>
            {openSelect && (
                <div className={roleSelectStyles.menu}>
                    <button type='button'
                        className={roleSelectStyles.menu_item}
                        onClick={() => { setCurrRole('Owner') }}>
                        <AiOutlineCheck className={currRole === 'Owner'
                            ? roleSelectStyles.active_icon
                            : roleSelectStyles.disabled_icon} />
                        Owner
                    </button>
                    <button type='button'
                        className={roleSelectStyles.menu_item}
                        onClick={() => { setCurrRole('Admin') }}>
                        <AiOutlineCheck className={currRole === 'Admin'
                            ? roleSelectStyles.active_icon
                            : roleSelectStyles.disabled_icon} />
                        Admin
                    </button>
                    <button type='button'
                        className={roleSelectStyles.menu_item}
                        onClick={() => { setCurrRole('Member') }}>
                        <AiOutlineCheck className={currRole === 'Member'
                            ? roleSelectStyles.active_icon
                            : roleSelectStyles.disabled_icon} />
                        Member
                    </button>
                </div>
            )}
        </div>
    )
}

export default RoleSelect;