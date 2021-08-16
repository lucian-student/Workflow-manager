import React from 'react';
import { MdSubtitles, MdDescription } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { TeamInput } from '../../generated/apolloComponents';
import teamFormFirstStepStyles from './TeamFormFirstStep/TeamFormFirstStep.module.css';

function TeamFormFirstStep(): JSX.Element {

    const { handleSubmit, formState: { errors }, register } = useForm();

    function saveTeamData(data: TeamInput) {

    }

    return (
        <form onSubmit={handleSubmit(saveTeamData)} className={teamFormFirstStepStyles.form}>
            <div className={teamFormFirstStepStyles.input_wrapper}>
                <div className={teamFormFirstStepStyles.form_label}>
                    <MdSubtitles className={teamFormFirstStepStyles.display_icon} />
                    <label className={teamFormFirstStepStyles.label}>
                        Name
                    </label>
                </div>
                <input
                    className={teamFormFirstStepStyles.input}
                    name='name'
                    type='text'
                    autoComplete='off'
                    placeholder='Enter project name...'
                    {...register('name', {
                        validate: {
                            min_length: (value) => { return value.trimStart().trimEnd().replace(/\s+/g, " ").length >= 1 },
                            max_length: (value) => { return value.trimStart().trimEnd().replace(/\s+/g, " ").length <= 20 }
                        }
                    })} />
                {errors.name && errors.name.type === 'validate' && (
                    <div className='error_message'>Name is empty!</div>
                )}
                {errors.name && errors.name.type === 'min_length' && (
                    <div className='error_message'>Name has to be at least 1 characters long!</div>
                )}
                {errors.name && errors.name.type === 'max_length' && (
                    <div className='error_message'>Name cannot be longer than 20 characters!</div>
                )}
            </div>
            <div className={teamFormFirstStepStyles.input_wrapper}>
                <div className={teamFormFirstStepStyles.form_label}>
                    <MdDescription className={teamFormFirstStepStyles.display_icon} />
                    <label className={teamFormFirstStepStyles.label}>
                        Description
                    </label>
                </div>
                <textarea
                    className={[teamFormFirstStepStyles.input, teamFormFirstStepStyles.text_area].join(' ')}
                    name='description'
                    autoComplete='off'
                    placeholder='Enter projects description...'
                    {...register('description')} />
            </div>
            <button className={teamFormFirstStepStyles.submit_button}
                type='submit'>
                Create Team
            </button>
        </form>
    )
}

export default TeamFormFirstStep;