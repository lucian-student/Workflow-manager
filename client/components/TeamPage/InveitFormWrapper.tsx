import React, { useState, useEffect, useContext } from 'react';
import inveitFormWrapperStyles from './InveitFormWrapper/InveitFormWrapper.module.css';
import { VscAdd } from 'react-icons/vsc';
import { ImCancelCircle } from 'react-icons/im';
import { useStackingMenuCustom } from '../../hooks/useStackingMenuCustom';
import { MenuContext } from '../../context/menu';
import InveitForm from './InveitForm';

interface Props {
    team_id: number
}

function InveitFormWrapper({ team_id }: Props): JSX.Element {

    const [open, setOpen] = useState<boolean>(false);

    const { menuRef } = useStackingMenuCustom({ setOpen });

    const stackingMenu = useContext(MenuContext);

    useEffect(() => {
        if (!open) {
            stackingMenu.setOpen(false);
        }
    }, [open]);

    return (
        <div>
            <button className={inveitFormWrapperStyles.modal_button}
                onClick={() => setOpen(true)}>
                <VscAdd className={inveitFormWrapperStyles.add_icon} />
            </button>
            {open && (
                <div className={inveitFormWrapperStyles.modal_bg}>
                    <div ref={menuRef} className={inveitFormWrapperStyles.modal}>
                        <ImCancelCircle className={inveitFormWrapperStyles.cancel_modal}
                            onClick={() => setOpen(false)} />
                        <InveitForm team_id={team_id} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default InveitFormWrapper;