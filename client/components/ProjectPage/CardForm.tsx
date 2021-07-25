import React, { useContext } from 'react';
import cardFormStyles from './CardForm/CardForm.module.css';
import { useForm } from 'react-hook-form';
import { ImCancelCircle } from 'react-icons/im';
import { CardAddContext } from '../../context/cardAdd';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';


function CardForm(): JSX.Element {

    const { handleSubmit, register, formState: { errors }, reset } = useForm();

    const { open, setOpen, list } = useContext(CardAddContext);

    const { menuRef } = useDropdownCustom({ setOpen });

    return (
        <div className={open ? cardFormStyles.modal_bg : cardFormStyles.hide_modal}>
            <div ref={menuRef} className={cardFormStyles.modal}>
                <ImCancelCircle className={cardFormStyles.cancel_modal}
                    onClick={() => setOpen(false)} />
                <form>
                    {list.list_id}
                </form>
            </div>
        </div>
    )
}

export default CardForm;