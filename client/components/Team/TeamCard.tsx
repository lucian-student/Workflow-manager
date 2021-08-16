import React from 'react';
import Link from 'next/link';
import { Team } from '../../generated/apolloComponents';
import teamCardStyles from './TeamCard/TeamCard.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MdOpenInNew } from 'react-icons/md'

dayjs.extend(relativeTime);

interface Props {
    team: {
        __typename?: "Team";
    } & Pick<Team, "team_id" | "name" | "description" | "last_active" | "user_count" | "project_count">
}

function TeamCard({ team }: Props): JSX.Element {

    return (
        <div className={teamCardStyles.card}>
            <div className={teamCardStyles.pc_wrapper}>
                <div className={teamCardStyles.icon_wrapper}>
                    <div className={teamCardStyles.message_icon}>
                        {team.name.charAt(0)}
                    </div>
                </div>
                <div className={teamCardStyles.wrapper}>
                    <div className={teamCardStyles.text}>
                        {team.name}
                    </div>
                </div>
                <div className={teamCardStyles.wrapper_last_active}>
                    <div className={teamCardStyles.text}>
                        {`Last active ${dayjs(team.last_active).fromNow()}`}
                    </div>
                </div>
                <div className={teamCardStyles.wrapper_link}>
                    <Link href={`/team/${team.team_id}`}>
                        <a className={teamCardStyles.toggle_button}>
                            <MdOpenInNew className={teamCardStyles.icon} />
                        </a>
                    </Link>
                </div>
            </div>
            <div className={teamCardStyles.mobile_wrapper}>
                <div className={teamCardStyles.data_wrapper}>
                    <div className={teamCardStyles.message_icon}>
                        {team.name.charAt(0)}
                    </div>
                    <div className={teamCardStyles.text}>
                        {team.name}
                    </div>
                    <div className={teamCardStyles.text}>
                        {`Last active ${dayjs(team.last_active).fromNow()}`}
                    </div>
                </div>
                <Link href={`/team/${team.team_id}`}>
                    <a className={teamCardStyles.toggle_button}>
                        <MdOpenInNew className={teamCardStyles.icon} />
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default TeamCard;