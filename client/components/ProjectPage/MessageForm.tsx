import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { MessageInput, CreateMessageMutation } from '../../generated/apolloComponents';
import messageFormStyles from './MessageForm/MessageForm.module.css';
import TextareaAutosize from 'react-textarea-autosize';
import { AuthContext } from '../../context/auth';

interface Props {
    data: CreateMessageMutation
    addMessage: (message: MessageInput) => Promise<void>
}

function MessageForm({ addMessage, data }: Props): JSX.Element {

    const { register, handleSubmit, reset, watch } = useForm();

    const content = watch('content', '');

    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        if (data) {
            reset();
        }
    }, [data]);

    return (
        <form onSubmit={handleSubmit(addMessage)} className={messageFormStyles.form}>
            <div className={messageFormStyles.input_wrapper}>
                <div className={messageFormStyles.message_icon}>
                    {currentUser !== false && currentUser !== true && (
                        <div className={messageFormStyles.icon_letter}>
                            {currentUser.username.charAt(0)}
                        </div>
                    )}
                </div>
                <TextareaAutosize
                    className={[messageFormStyles.input, messageFormStyles.textarea].join(' ')}
                    name='content'
                    autoComplete='off'
                    placeholder='Enter messages content...'
                    {...register('content')} />
            </div>
            {content.trim().length > 0 && (
                <div className={messageFormStyles.button_wrapper}>
                    <button type='button' className={messageFormStyles.cancel_button} onClick={() => { reset() }}>
                        Cancel
                    </button>
                    <button type='submit' className={messageFormStyles.submit_button}>
                        Save
                    </button>
                </div>
            )}
        </ form>
    )
}

export default MessageForm;