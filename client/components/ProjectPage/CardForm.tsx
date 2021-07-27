import React, { useContext, useState, useEffect } from 'react';
import cardFormStyles from './CardForm/CardForm.module.css';
import { useForm } from 'react-hook-form';
import { ImCancelCircle } from 'react-icons/im';
import { CardAddContext } from '../../context/cardAdd';
import { useStackingMenuCustom } from '../../hooks/useStackingMenuCustom';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';
import { MdDateRange, MdSubtitles, MdDescription } from 'react-icons/md';
import LinkForm from './LinkForm';
import TodoForm from './TodoForm';
import { VscAdd } from 'react-icons/vsc';
import TodoInputDisplay from './TodoInputDisplay';
import LinkInputDisplay from './LinkInputDisplay';
import { MenuContext } from '../../context/menu';


function CardForm(): JSX.Element {

    const { handleSubmit, register, formState: { errors }, reset } = useForm();

    const { open, setOpen, list } = useContext(CardAddContext);

    const closeBlock = useContext(MenuContext);

    const { menuRef } = useStackingMenuCustom({ setOpen });

    const [openLinkForm, setOpenLinkForm] = useState<boolean>(false);

    const linkForm = useDropdownCustom({ setOpen: setOpenLinkForm });

    const [openTodoForm, setOpenTodoForm] = useState<boolean>(false);

    const todoForm = useDropdownCustom({ setOpen: setOpenTodoForm })

    useEffect(() => {
        if (openTodoForm || openLinkForm) {
            closeBlock.setOpen(true);
        } else {
            closeBlock.setOpen(false);
        }
    }, [
        openLinkForm,
        openTodoForm
    ]);

    async function createCard(data) {
        console.log(data);
    }

    return (
        <div className={open ? cardFormStyles.modal_bg : cardFormStyles.hide_modal}>
            <div ref={menuRef} className={cardFormStyles.modal}>
                <ImCancelCircle className={cardFormStyles.cancel_modal}
                    onClick={() => setOpen(false)} />
                <form className={cardFormStyles.form}
                    onSubmit={handleSubmit(createCard)}>
                    <button className={cardFormStyles.submit_button}
                        type='submit'>
                        Add card
                    </button>
                    <div className={cardFormStyles.input_wrapper}>
                        <div className={cardFormStyles.form_label}>
                            <MdSubtitles className={cardFormStyles.display_icon} />
                            <label className={cardFormStyles.label}>
                                Name
                            </label>
                        </div>
                        <input
                            className={cardFormStyles.input}
                            name='name'
                            type='text'
                            autoComplete='off'
                            placeholder='Enter card name...'
                            {...register('name', {
                                validate: {
                                    min_length: (value) => { return value.trimStart().trimEnd().replace(/\s+/g, " ").length >= 1 },
                                    max_length: (value) => { return value.trimStart().trimEnd().replace(/\s+/g, " ").length <= 20 }
                                }
                            })} />
                        {errors.name && errors.name.type === 'validate' && (
                            <div className='error_message'>Name is empty!</div>
                        )}
                        {errors.name && errors.name.type === 'min_length' && (
                            <div className='error_message'>Name has to be at least 1 characters long!</div>
                        )}
                        {errors.name && errors.name.type === 'max_length' && (
                            <div className='error_message'>Name cannot be longer than 20 characters!</div>
                        )}
                    </div>
                    <div className={cardFormStyles.input_wrapper}>
                        <div className={cardFormStyles.form_label}>
                            <MdDateRange className={cardFormStyles.display_icon} />
                            <label className={cardFormStyles.label}>
                                Deadline
                            </label>
                        </div>
                        <input
                            className={cardFormStyles.input}
                            name='deadline'
                            type='date'
                            autoComplete='off'
                            placeholder='Enter card deadline...'
                            {...register('deadline', {
                                required: true
                            })} />
                        {errors.deadline && errors.deadline.type === 'required' && (
                            <div className='error_message'>Deadline is empty!</div>
                        )}
                    </div>
                    <div className={cardFormStyles.input_wrapper}>
                        <div className={cardFormStyles.form_label}>
                            <MdDescription className={cardFormStyles.display_icon} />
                            <label className={cardFormStyles.label}>
                                Description
                            </label>
                        </div>
                        <textarea
                            className={[cardFormStyles.input, cardFormStyles.text_area].join(' ')}
                            name='description'
                            autoComplete='off'
                            placeholder='Enter card description...'
                            {...register('description')} />
                    </div>
                </form>
                <div className={cardFormStyles.options}>
                    <div ref={todoForm.menuRef}>
                        <button className={cardFormStyles.toggle_button}
                            onClick={() => setOpenTodoForm(old => !old)}>
                            <VscAdd className={cardFormStyles.icon} />
                            <div>Add Todo</div>
                        </button>
                        {openTodoForm && (
                            <TodoForm />
                        )}
                    </div>
                    <div ref={linkForm.menuRef}>
                        <button className={cardFormStyles.toggle_button}
                            onClick={() => setOpenLinkForm(old => !old)}>
                            <VscAdd className={cardFormStyles.icon} />
                            <div>Add Link</div>
                        </button>
                        {openLinkForm && (
                            <LinkForm />
                        )}
                    </div>
                </div>
                <TodoInputDisplay />
                <LinkInputDisplay />
            </div>
        </div >
    )
}

export default CardForm;