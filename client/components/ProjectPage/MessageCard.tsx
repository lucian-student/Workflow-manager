import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Message } from '../../generated/apolloComponents';
import messageCardStyles from './MessageCard/MessageCard.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Options from './Options';
import { CardViewContext } from '../../context/cardView';
import { useDeleteMessageMutation } from '../../graphqlHooks/message/useDeleteMessageMutation';
import { CardContext } from '../../context/card';

dayjs.extend(relativeTime);

interface Props {
    message: Message
}

interface RouterProps {
    project_id?: string,
    team_id?: string
}

function MessageCard({ message }: Props): JSX.Element {

    const [editing, setEditing] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();
    const { project_id, team_id }: RouterProps = router.query;

    const { setOpenLinkOptions } = useContext(CardViewContext);
    const { card } = useContext(CardContext);

    const { deleteMessageMutation } = useDeleteMessageMutation({
        project_id,
        team_id,
        card_id: card.card_id
    });

    async function removeMessage() {
        await deleteMessageMutation({
            variables: {
                project_id: Number(project_id),
                team_id: Number(team_id),
                message_id: Number(message.message_id)
            }
        })
    }

    useEffect(() => {
        if (open || editing) {
            setOpenLinkOptions(true);
        } else {
            setOpenLinkOptions(false);
        }
    }, [open, editing]);

    return (
        <div className={messageCardStyles.card_wrapper}>
            <div className={messageCardStyles.wrapper}>
                <div className={messageCardStyles.message_icon}>
                    {message.username && (
                        <Fragment>
                            {message.username.charAt(0)}
                        </Fragment>
                    )}
                </div>
            </div>
            <div className={messageCardStyles.data_wrapper}>
                <div className={messageCardStyles.details}>
                    {message.username && (
                        <div className={messageCardStyles.text}>
                            {message.username}
                        </div>
                    )}
                    <div className={messageCardStyles.text}>
                        {dayjs(message.data_of_creation).fromNow()}
                    </div>
                </div>
                <div className={messageCardStyles.content}>
                    {message.content}
                </div>
            </div>
            <div className={messageCardStyles.wrapper}>
                <Options type='message' setEditing={setEditing} open={open} setOpen={setOpen} remove={removeMessage} />
            </div>
        </div>
    )
}

export default MessageCard;