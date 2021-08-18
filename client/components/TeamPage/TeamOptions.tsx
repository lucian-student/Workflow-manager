import React, { useContext, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import teamOptionsStyles from './TeamOptions/TeamOptions.module.css';
import { TeamContext } from '../../context/team';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';

function TeamOptions(): JSX.Element {

    const { getRole, setDisplaying } = useContext(TeamContext);

    const [open, setOpen] = useState<boolean>(false);

    const { menuRef } = useDropdownCustom({ setOpen });

    return (
        <div className={teamOptionsStyles.team_options_wrapper}>
            <div ref={menuRef}>
                <button className={teamOptionsStyles.toggle_button}
                    onClick={() => { setOpen(old => !old) }}>
                    <BsThreeDots className={teamOptionsStyles.icon} />
                </button>
                {open && (
                    <div className={teamOptionsStyles.menu}>
                        <button className={teamOptionsStyles.menu_item}
                            onClick={() => { }}>
                            View team
                        </button>
                        <div className={teamOptionsStyles.display_select}>
                            <button className={teamOptionsStyles.menu_item}
                                onClick={() => { setDisplaying('projects') }}>
                                View projects
                            </button>
                            <button className={teamOptionsStyles.menu_item}
                                onClick={() => { setDisplaying('members') }}>
                                View members
                            </button>
                        </div>
                        <button className={teamOptionsStyles.menu_item}>
                            Leave team
                        </button>
                        {getRole() === 1 && (
                            <button className={teamOptionsStyles.menu_item}
                                onClick={() => { }}>
                                Delete team
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TeamOptions;