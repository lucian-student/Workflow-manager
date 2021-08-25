import React, { useContext, useState, useEffect } from 'react';
import { useStackingMenuCustom } from '../../hooks/useStackingMenuCustom';
import { useTwoPartMenuCustom } from '../../hooks/useTwoPartMenuCustom';
import teamViewStyles from './TeamView/TeamView.module.css';
import { ImCancelCircle } from 'react-icons/im';
import { TeamContext } from '../../context/team';
import { AiOutlineEdit } from 'react-icons/ai';
import { MenuContext } from '../../context/menu';
import TeamData from './TeamData';
import TeamDataForm from './TeamDataForm';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function TeamView({ setOpen }: Props): JSX.Element {

    const { menuRef } = useStackingMenuCustom({ setOpen });

    const { getRole } = useContext(TeamContext);

    const [editing, setEditing] = useState<boolean>(false);

    const editForm = useTwoPartMenuCustom({ setOpen: setEditing });

    const block = useContext(MenuContext);

    useEffect(() => {
        if (editing) {
            block.setOpen(true);
        } else {
            block.setOpen(false);
        }
    }, [editing]);

    return (
        <div className={teamViewStyles.modal_bg}>
            <div ref={menuRef} className={teamViewStyles.modal}>
                <ImCancelCircle className={teamViewStyles.cancel_modal}
                    onClick={() => setOpen(false)} />
                {getRole() <= 2 && (
                    <button ref={editForm.toggleButtonRef} className={[teamViewStyles.toggle_button, teamViewStyles.toggle].join(' ')}
                        onClick={() => setEditing(old => !old)}>
                        <AiOutlineEdit className={teamViewStyles.icon} />
                    </button>
                )}
                <div className={teamViewStyles.content}>
                    {!editing ? (
                        <TeamData />
                    ) : (
                        <TeamDataForm setEditing={setEditing} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TeamView;