import React from 'react';
import { UserTeamConnection } from '../../generated/apolloComponents';
import inveitCardStyles from './InveitCard/InveitCard.module.css';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import { useRejectUserTeamConnectionMutation, useAcceptUserTeamConnectionMutation } from '../../generated/apolloComponents';

interface Props {
    invitation: {
        __typename?: "UserTeamConnection";
    } & Pick<UserTeamConnection, "user_id" | "con_id" | "team_id" | "teamname" | "confirmed" | "role">
}

function InveitCard({ invitation }: Props): JSX.Element {

    function AcceptInvitation() {

    }

    function RejectInvitation() {

    }

    return (
        <div className={inveitCardStyles.card}>
            <div className={inveitCardStyles.pc_wrapper}>
                <div className={inveitCardStyles.message_icon}>
                    {invitation.teamname.charAt(0)}
                </div>
                <div className={inveitCardStyles.text}>
                    {invitation.teamname}
                </div>
                <div className={inveitCardStyles.actions}>
                    <button className={inveitCardStyles.toggle_button}
                        onClick={AcceptInvitation}>
                        <FaRegCheckCircle className={inveitCardStyles.icon} />
                    </button>
                    <button className={inveitCardStyles.toggle_button}
                        onClick={RejectInvitation}>
                        <FaRegTimesCircle className={inveitCardStyles.icon} />
                    </button>
                </div>
            </div>
            <div className={inveitCardStyles.mobile_wrapper}>
                <div className={inveitCardStyles.data_wrapper}>
                    <div className={inveitCardStyles.message_icon}>
                        {invitation.teamname.charAt(0)}
                    </div>
                    <div className={inveitCardStyles.text}>
                        {invitation.teamname}
                    </div>
                </div>
                <div className={inveitCardStyles.actions}>
                    <button className={inveitCardStyles.toggle_button}
                        onClick={AcceptInvitation}>
                        <FaRegCheckCircle className={inveitCardStyles.icon} />
                    </button>
                    <button className={inveitCardStyles.toggle_button}
                        onClick={RejectInvitation}>
                        <FaRegTimesCircle className={inveitCardStyles.icon} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InveitCard;