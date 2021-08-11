import React, { Fragment, useContext } from 'react'
import { useForm } from 'react-hook-form';
import { MessageInput } from '../../generated/apolloComponents';
import messageEditFormStyles from './MessageForm/MessageForm.module.css';
import TextareaAutosize from 'react-textarea-autosize';
import { AuthContext } from '../../context/auth';

interface Props {
    editMessage: (message: MessageInput) => Promise<void>
    content: string
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

function MessageEditForm({ editMessage, content, setEditing }: Props): JSX.Element {

    const { register, handleSubmit, reset, watch } = useForm();

    const contentWatch = watch('content', '');

    const { currentUser } = useContext(AuthContext);

    return (
        <form onSubmit={handleSubmit(editMessage)} className={messageEditFormStyles.form}>
            <div className={messageEditFormStyles.input_wrapper}>
            <div className={messageEditFormStyles.wrapper}>
                <div className={messageEditFormStyles.message_icon}>
                    {currentUser !== false && currentUser !== true && (
                        <Fragment>
                            {currentUser.username.charAt(0)}
                        </Fragment>
                    )}
                </div>
                </div>
                <TextareaAutosize
                    className={[messageEditFormStyles.input, messageEditFormStyles.textarea].join(' ')}
                    name='content'
                    autoComplete='off'
                    placeholder='Enter messages content...'
                    defaultValue={content}
                    {...register('content')} />
            </div>
            {contentWatch.trim().length > 0 && (
                <div className={messageEditFormStyles.button_wrapper}>
                    <button type='button' className={messageEditFormStyles.cancel_button} onClick={() => { setEditing(false); }}>
                        Cancel
                    </button>
                    <button type='submit' className={messageEditFormStyles.submit_button}>
                        Save
                    </button>
                </div>
            )}
        </ form>
    )
}

export default MessageEditForm;