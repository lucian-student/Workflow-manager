import React from 'react';
import linkEditFormStyles from './LinkEditForm/LinkEditForm.module.css';
import { useForm } from 'react-hook-form';
import { MdSubtitles } from 'react-icons/md';
import { BsLink45Deg } from 'react-icons/bs';
import { LinkInput } from '../../generated/apolloComponents';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    link: LinkInput
    editLink: (data: LinkInput) => void | Promise<void>
}

function LinkEditForm({ setOpen, link, editLink }: Props): JSX.Element {
    const { handleSubmit, register, formState: { errors } } = useForm();

    const { menuRef } = useDropdownCustom({ setOpen });

    return (
        <div ref={menuRef} className={linkEditFormStyles.link_form_wrapper}>
            <form onSubmit={handleSubmit(editLink)}
                className={linkEditFormStyles.form}>
                <div className={linkEditFormStyles.input_wrapper}>
                    <div className={linkEditFormStyles.form_label}>
                        <MdSubtitles className={linkEditFormStyles.display_icon} />
                        <label className={linkEditFormStyles.label}>
                            Name
                        </label>
                    </div>
                    <input
                        className={linkEditFormStyles.input}
                        name='name'
                        type='text'
                        autoComplete='off'
                        placeholder='Enter link name...'
                        defaultValue={link.name}
                        {...register('name', {
                            validate: {
                                min_length: (value) => { return value.trimStart().trimEnd().replace(/\s+/g, " ").length >= 1 },
                                max_length: (value) => { return value.trimStart().trimEnd().replace(/\s+/g, " ").length <= 15 }
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
                <div className={linkEditFormStyles.input_wrapper}>
                    <div className={linkEditFormStyles.form_label}>
                        <BsLink45Deg className={linkEditFormStyles.display_icon} />
                        <label className={linkEditFormStyles.label}>
                            Url
                        </label>
                    </div>
                    <input
                        className={linkEditFormStyles.input}
                        name='url'
                        type='text'
                        autoComplete='off'
                        placeholder='Enter links url...'
                        defaultValue={link.url}
                        {...register('url')} />
                </div>
                <button className={linkEditFormStyles.submit_button}
                    type='submit'>
                    Save
                </button>
            </form>
        </div>
    )
}

export default LinkEditForm;