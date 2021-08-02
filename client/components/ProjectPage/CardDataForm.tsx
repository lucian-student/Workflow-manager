import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { MdDateRange, MdSubtitles, MdDescription } from 'react-icons/md';
import { Card, CardInput } from '../../generated/apolloComponents';
import cardDataFormStyles from './CardDataForm/CardDataForm.module.css';
import dayjs from 'dayjs';

interface Props {
    createCard: (data: CardInput) => Promise<void>,
    card?: Card
}

function CardDataForm({ createCard, card }: Props) {

    const { handleSubmit, formState: { errors }, register } = useForm();

    return (
        <form className={cardDataFormStyles.form}
            onSubmit={handleSubmit(createCard)}>
            <button className={cardDataFormStyles.submit_button}
                type='submit'>
                {card ? (
                    <Fragment>
                        Save
                    </Fragment>
                ) : (
                    <Fragment>
                        Add card
                    </Fragment>
                )}
            </button>
            <div className={cardDataFormStyles.input_wrapper}>
                <div className={cardDataFormStyles.form_label}>
                    <MdSubtitles className={cardDataFormStyles.display_icon} />
                    <label className={cardDataFormStyles.label}>
                        Name
                    </label>
                </div>
                <input
                    className={cardDataFormStyles.input}
                    name='name'
                    type='text'
                    autoComplete='off'
                    placeholder='Enter card name...'
                    defaultValue={card ? card.name : ''}
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
            <div className={cardDataFormStyles.input_wrapper}>
                <div className={cardDataFormStyles.form_label}>
                    <MdDateRange className={cardDataFormStyles.display_icon} />
                    <label className={cardDataFormStyles.label}>
                        Deadline
                    </label>
                </div>
                <input
                    className={cardDataFormStyles.input}
                    name='deadline'
                    type='date'
                    autoComplete='off'
                    placeholder='Enter cards deadline...'
                    defaultValue={card ? dayjs(card.deadline).toISOString().substr(0, 10) : undefined}
                    {...register('deadline', {
                        required: true
                    })} />
                {errors.deadline && errors.deadline.type === 'required' && (
                    <div className='error_message'>Deadline is empty!</div>
                )}
            </div>
            <div className={cardDataFormStyles.input_wrapper}>
                <div className={cardDataFormStyles.form_label}>
                    <MdDescription className={cardDataFormStyles.display_icon} />
                    <label className={cardDataFormStyles.label}>
                        Description
                    </label>
                </div>
                <textarea
                    className={[cardDataFormStyles.input, cardDataFormStyles.text_area].join(' ')}
                    name='description'
                    autoComplete='off'
                    placeholder='Enter cards description...'
                    defaultValue={card ? card.description : ''}
                    {...register('description')} />
            </div>
        </form>
    )
}

export default CardDataForm;