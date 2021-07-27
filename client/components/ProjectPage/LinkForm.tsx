import React, { useContext } from 'react';
import linkFormStyles from './LinkForm/LinkForm.module.css';
import { useForm } from 'react-hook-form';
import { MdSubtitles } from 'react-icons/md';
import { BsLink45Deg } from 'react-icons/bs';
import { CardAddContext } from '../../context/cardAdd';
import { LinkInput } from '../../generated/apolloComponents';

function LinkForm(): JSX.Element {

    const { handleSubmit, register, formState: { errors } } = useForm();

    const { setLinks } = useContext(CardAddContext);

    function addLink(data: LinkInput) {
        setLinks(links => {
            return [data, ...links]
        })
    }

    return (
        <div className={linkFormStyles.link_form_wrapper}>
            <form onSubmit={handleSubmit(addLink)}
                className={linkFormStyles.form}>
                <div className={linkFormStyles.input_wrapper}>
                    <div className={linkFormStyles.form_label}>
                        <MdSubtitles className={linkFormStyles.display_icon} />
                        <label className={linkFormStyles.label}>
                            Name
                        </label>
                    </div>
                    <input
                        className={linkFormStyles.input}
                        name='name'
                        type='text'
                        autoComplete='off'
                        placeholder='Enter card name...'
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
                <div className={linkFormStyles.input_wrapper}>
                    <div className={linkFormStyles.form_label}>
                        <BsLink45Deg className={linkFormStyles.display_icon} />
                        <label className={linkFormStyles.label}>
                            Url
                        </label>
                    </div>
                    <input
                        className={linkFormStyles.input}
                        name='url'
                        type='text'
                        autoComplete='off'
                        placeholder='Enter card url...'
                        {...register('url')} />
                </div>
                <button className={linkFormStyles.submit_button}
                    type='submit'>
                    Add Link
                </button>
            </form>
        </div>
    )
}

export default LinkForm;