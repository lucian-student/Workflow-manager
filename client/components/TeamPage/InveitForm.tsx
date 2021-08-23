import React, { useState, useEffect } from 'react';
import inveitFormStyles from './InveitForm/InveitForm.module.css';
import { VscAdd } from 'react-icons/vsc';
import { ImCancelCircle } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import { useStackingMenuCustom } from '../../hooks/useStackingMenuCustom';

function InveitForm(): JSX.Element {

    const [open, setOpen] = useState<boolean>(false);

    const { handleSubmit } = useForm();

    const { menuRef } = useStackingMenuCustom({ setOpen });

    function handleInveitMember() {

    }

    return (
        <div>
            <button className={inveitFormStyles.modal_button}
                onClick={() => setOpen(true)}>
                <VscAdd className={inveitFormStyles.add_icon} />
            </button>
            {open && (
                <div className={inveitFormStyles.modal_bg}>
                    <div ref={menuRef} className={inveitFormStyles.modal}>
                        <ImCancelCircle className={inveitFormStyles.cancel_modal}
                            onClick={() => setOpen(false)} />
                        <form onSubmit={handleSubmit(handleInveitMember)}
                            className={inveitFormStyles.form}>

                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InveitForm;