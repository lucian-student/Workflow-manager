import React, { useState } from 'react';
import { VscAdd } from 'react-icons/vsc';
import { ImCancelCircle } from 'react-icons/im'
import teamFormStyles from './TeamForm/TeamForm.module.css';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';
import TeamFormFirstStep from './TeamFormFirstStep';
// first step name description
// Second step select people to inveit


function TeamForm(): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);

    const { menuRef } = useDropdownCustom({ setOpen });

    return (
        <div>
            <button className={teamFormStyles.modal_button}
                onClick={() => setOpen(true)}>
                <VscAdd className={teamFormStyles.add_icon} />
            </button>
            {open && (
                <div className={teamFormStyles.modal_bg}>
                    <div ref={menuRef} className={teamFormStyles.modal}>
                        <ImCancelCircle className={teamFormStyles.cancel_modal}
                            onClick={() => setOpen(false)} />
                        <TeamFormFirstStep setOpen={setOpen}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TeamForm;