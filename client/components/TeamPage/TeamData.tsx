import React, { useContext } from 'react';
import teamDataStyles from './TeamData/TeamData.module.css';
import { TeamContext } from '../../context/team';
import { MdSubtitles, MdDescription } from 'react-icons/md';

function TeamData(): JSX.Element {

    const { team } = useContext(TeamContext);

    return (
        <div className={teamDataStyles.data_wrapper}>
            <div className={teamDataStyles.input_wrapper}>
                <div className={teamDataStyles.form_label}>
                    <MdSubtitles className={teamDataStyles.display_icon} />
                </div>
                <div className={teamDataStyles.text}>
                    <div>
                        {team.name}
                    </div>
                </div>
            </div>
            <div className={teamDataStyles.input_wrapper}>
                <div className={teamDataStyles.form_label}>
                    <MdDescription className={teamDataStyles.display_icon} />
                </div>
                <p className={teamDataStyles.description}>
                    {team.description}
                </p>
            </div>
        </div>
    )
}

export default TeamData;