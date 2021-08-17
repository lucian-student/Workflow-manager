import React, { useContext } from 'react';
import teamFormStepDisplayStyles from './TeamFormStepDisplay/TeamFormStepDisplay.module.css';
import { TeamFormContext } from '../../context/teamForm';

function TeamFormStepDisplay(): JSX.Element {

    const { step } = useContext(TeamFormContext);

    return (
        <div className={teamFormStepDisplayStyles.display_wrapper}>
            <div className={[teamFormStepDisplayStyles.step_wrapper, step==='1'?teamFormStepDisplayStyles.active:''].join(' ')}>
                <div className={teamFormStepDisplayStyles.icon_wrapper}>
                    <div>
                        1
                    </div>
                </div>
                <div className={teamFormStepDisplayStyles.text}>
                    Name your team
                </div>
            </div>
            <div className={[teamFormStepDisplayStyles.step_wrapper, step==='2'?teamFormStepDisplayStyles.active:''].join(' ')}>
                <div className={teamFormStepDisplayStyles.icon_wrapper}>
                    <div>
                        2
                    </div>
                </div>
                <div className={teamFormStepDisplayStyles.text}>
                    Inveit team members
                </div>
            </div>
        </div>
    )
}

export default TeamFormStepDisplay;