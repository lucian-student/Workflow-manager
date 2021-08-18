import React, { useContext } from 'react';
import TeamOptions from './TeamOptions';
import teamOptionBarStyles from './TeamOptionBar/TeamOptionBar.module.css';
import { Team } from '../../generated/apolloComponents';
import { TeamContext } from '../../context/team';

interface Props {
    team: Team
}

function TeamOptionBar({ team }: Props): JSX.Element {

    const { setDisplaying, displaying } = useContext(TeamContext);

    return (
        <div className={teamOptionBarStyles.option_bar_wrapper}>
            <div className={teamOptionBarStyles.left_menu}>
                <div className={[teamOptionBarStyles.team_name, teamOptionBarStyles.left_menu_item_wrapper].join(' ')}>
                    {team.name}
                </div>
                <div className={teamOptionBarStyles.buttons}>
                    <button className={[
                        teamOptionBarStyles.toggle_button,
                        teamOptionBarStyles.left_menu_item_wrapper,
                        displaying === 'projects' ? teamOptionBarStyles.active : ''
                    ].join(' ')}
                        onClick={() => { setDisplaying('projects') }}>
                        Projects
                    </button>
                    <button className={[
                        teamOptionBarStyles.toggle_button,
                        teamOptionBarStyles.left_menu_item_wrapper,
                        displaying === 'members' ? teamOptionBarStyles.active : ''
                    ].join(' ')}
                        onClick={() => { setDisplaying('members') }}>
                        Members
                    </button>
                </div>
            </div>
            <TeamOptions />
        </div>
    )
}

export default TeamOptionBar;