import React from 'react';
import { Message } from '../../generated/apolloComponents';
import messageDisplay from './MessageDisplay/MessageDisplay.module.css';
import MessageCard from './MessageCard';

interface Props {
    messages: Message[]
}

function MessageDisplay({ messages }: Props): JSX.Element {

    return (
        <div className={messageDisplay.display_wrapper}>
            {messages.map(message => (
                <MessageCard key={message.message_id} message={message} />
            ))}
        </div>
    )
}

export default MessageDisplay;