import React, { useContext } from 'react';
import { UserTeamConnection } from '../../generated/apolloComponents';
import memberCardStyles from './MemberCard/MemberCard.module.css';
import { TeamContext } from '../../context/team';

interface Props {
    member: {
        __typename?: "UserTeamConnection";
    } & Pick<UserTeamConnection, "team_id" | "con_id" | "user_id" | "username" | "confirmed" | "role">
}

function MemberCard({ member }: Props) {

    const { roles } = useContext(TeamContext);

    return (
        <div className={memberCardStyles.card}>
            <div className={memberCardStyles.pc_wrapper}>
                <div className={memberCardStyles.icon_wrapper}>
                    <div className={memberCardStyles.message_icon}>
                        {member.username.charAt(0)}
                    </div>
                </div>
                <div className={memberCardStyles.wrapper}>
                    <div className={memberCardStyles.text}>
                        {member.username}
                    </div>
                </div>
                <div className={memberCardStyles.wrapper}>
                    <div className={memberCardStyles.text}>
                        {roles.get(member.role)}
                    </div>
                </div>
                <div className={memberCardStyles.options_wrapper}>
                  
                </div>
            </div>
        </div>
    )
}

export default MemberCard;