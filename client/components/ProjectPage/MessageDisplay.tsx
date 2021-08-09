import React from 'react';
import { Message } from '../../generated/apolloComponents';
import messageDisplay from './MessageDisplay/MessageDisplay.module.css';

interface Props {
    messages: Message[]
}

function MessageDisplay({ messages }: Props): JSX.Element {

    return (
        <div>
            {messages.map(message => (
                <div key={message.message_id}>
                    message
                </div>
            ))}
        </div>
    )
}

export default MessageDisplay;