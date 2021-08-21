import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import memberOptionStyles from './MemberOptions/MemberOptions.module.css';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';

interface Props {
    you: () => boolean
}

function MemberOptions({ you }: Props) {

    const [open, setOpen] = useState<boolean>(false);

    const { menuRef } = useDropdownCustom({ setOpen });

    return (
        <div className={memberOptionStyles.options_wrapper} ref={menuRef}>
            <button className={memberOptionStyles.toggle_button}
                onClick={() => { setOpen(old => !old) }}>
                <BsThreeDots className={memberOptionStyles.icon} />
            </button>
            {open && (
                <div className={memberOptionStyles.menu}>
                    <button className={memberOptionStyles.menu_item}
                        onClick={() => { }}>
                        Change role
                    </button>
                    {!you() && (
                        <button className={memberOptionStyles.menu_item}
                            onClick={() => { }}>
                            Remove user
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default MemberOptions;