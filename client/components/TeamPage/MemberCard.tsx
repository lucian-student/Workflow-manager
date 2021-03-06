import React, { useContext, useState } from 'react';
import { UserTeamConnection } from '../../generated/apolloComponents';
import memberCardStyles from './MemberCard/MemberCard.module.css';
import { TeamContext } from '../../context/team';
import { AuthContext } from '../../context/auth';
import MemberOptions from './MemberOptions';
import RoleForm from './RoleForm';
import { MenuContextProvider } from '../../context/menu';

interface Props {
    member: {
        __typename?: "UserTeamConnection";
    } & Pick<UserTeamConnection, "team_id" | "con_id" | "user_id" | "username" | "confirmed" | "role">
}

function MemberCard({ member }: Props) {

    const { roles, getRole } = useContext(TeamContext);

    const { currentUser } = useContext(AuthContext);

    const [openRoleForm, setOpenRoleForm] = useState<boolean>(false);

    function showOptions(): boolean {

       /* if (currentUser !== false && currentUser !== true) {
            if (Number(currentUser.user_id) === Number(member.user_id)) {
                return true;
            }
        }

        if (getRole() === 1 && Number(member.user_id) !== 1) {
            return true;
        }*/

        return getRole()===1;
    }

    function you(): boolean {
        if (currentUser !== false && currentUser !== true) {
            if (Number(currentUser.user_id) === Number(member.user_id)) {
                return true;
            }
        }

        return false;
    }

    return (
        <div className={[memberCardStyles.card, openRoleForm ? memberCardStyles.card_form_open : ''].join(' ')}>
            {openRoleForm && (
                <MenuContextProvider>
                    <RoleForm setOpen={setOpenRoleForm} role={member.role} team_id={member.team_id} con_id={member.con_id} />
                </MenuContextProvider>
            )}
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
                    {showOptions() && (
                        <MemberOptions you={you} setOpenForm={setOpenRoleForm} team_id={member.team_id} con_id={member.con_id} />
                    )}
                </div>
            </div>
            <div className={memberCardStyles.mobile_wrapper}>
                <div className={memberCardStyles.data_wrapper}>
                    <div className={memberCardStyles.icon_wrapper}>
                        <div className={memberCardStyles.message_icon}>
                            {member.username.charAt(0)}
                        </div>
                    </div>
                    <div className={memberCardStyles.text}>
                        {member.username}
                    </div>
                    <div className={memberCardStyles.text}>
                        {roles.get(member.role)}
                    </div>
                </div>
                {showOptions() && (
                    <MemberOptions you={you} setOpenForm={setOpenRoleForm} team_id={member.team_id} con_id={member.con_id} />
                )}
            </div>
        </div>
    )
}

export default MemberCard;