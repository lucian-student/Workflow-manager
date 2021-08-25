import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetTeamInvitationsQuery, UserTeamConnection } from '../../generated/apolloComponents';
import inveitCardStyles from './InveitCard/InveitCard.module.css';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import { useRejectUserTeamConnectionMutation, useAcceptUserTeamConnectionMutation } from '../../generated/apolloComponents';
import { getTeamInvitationsQuery } from '../../graphql/userTeamConnections/query/getTeamInvitations';
import update from 'immutability-helper';

interface Props {
    invitation: {
        __typename?: "UserTeamConnection";
    } & Pick<UserTeamConnection, "user_id" | "con_id" | "team_id" | "teamname" | "confirmed" | "role">
}

function InveitCard({ invitation }: Props): JSX.Element {

    const router = useRouter();

    const [acceptUserTeamConnectionMutation, { data }] = useAcceptUserTeamConnectionMutation({
        onError(err) {
            console.log(err.message);
        }
    });

    function AcceptInvitation() {
        acceptUserTeamConnectionMutation({
            variables: {
                con_id: Number(invitation.con_id)
            }
        });
    }

    useEffect(() => {
        if (data) {
            router.push(`/team/${invitation.team_id}`);
        }
    }, [data]);

    const [rejectUserTeamConnectionMutation] = useRejectUserTeamConnectionMutation({
        onError(err) {
            console.log(err.message);
        },
        update(proxy, result) {
            const query = proxy.readQuery({
                query: getTeamInvitationsQuery
            }) as GetTeamInvitationsQuery;

            console.log(query);

            const conIndex = query.getTeamInvitations.cons.findIndex(con => Number(con.con_id) === Number(result.data.rejectUserTeamConnection));

            proxy.writeQuery({
                query: getTeamInvitationsQuery,
                data: update(query, {
                    getTeamInvitations: {
                        cons: {
                            $splice: [[conIndex, 1]]
                        }
                    }
                })
            })
        }
    });

    function RejectInvitation() {
        rejectUserTeamConnectionMutation({
            variables: {
                con_id: Number(invitation.con_id)
            }
        });
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