import React from 'react'
import { useForm } from 'react-hook-form';
import { MessageInput } from '../../generated/apolloComponents';
import messageFormStyles from './MessageForm/MessageForm.module.css';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    addMessage: (message: MessageInput) => Promise<void>
    buttonRef: React.MutableRefObject<HTMLDivElement>
}

function MessageForm({ addMessage, setOpen }: Props): JSX.Element {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    return (
        <form onSubmit={handleSubmit(addMessage)}>

        </ form>
    )
}

export default MessageForm;