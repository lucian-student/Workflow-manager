import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TeamContext } from '../../context/team';
import teamDataFormStyles from './TeamDataForm/TeamDataForm.module.css';
import { MdSubtitles, MdDescription } from 'react-icons/md';
import TextareaAutosize from 'react-textarea-autosize';
import { GetTeamQuery, TeamInput, useEditTeamMutation } from '../../generated/apolloComponents';
import { getTeamQuery } from '../../graphql/team/query/getTeam';
import update from 'immutability-helper';

interface Props {
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

function TeamDataForm({ setEditing }: Props): JSX.Element {

    const { team } = useContext(TeamContext);

    const { handleSubmit, formState: { errors }, register } = useForm();

    const [editTeamMutation, { data }] = useEditTeamMutation({
        onError(err) {
            console.log(err.message);
        },
        update(proxy, result) {

            const query = proxy.readQuery({
                query: getTeamQuery,
                variables: {
                    team_id: Number(team.team_id)
                }
            }) as GetTeamQuery;

            proxy.writeQuery({
                query: getTeamQuery,
                variables: {
                    team_id: Number(team.team_id)
                },
                data: update(query, {
                    getTeam: {
                        name: {
                            $set: result.data.editTeam.name
                        },
                        description: {
                            $set: result.data.editTeam.description
                        }
                    }
                })
            });
            
        }
    });

    function handleEditTeam(input: TeamInput) {
        editTeamMutation({
            variables: {
                data: input,
                team_id: Number(team.team_id)
            }
        });
    }

    useEffect(() => {
        if (data) {
            setEditing(false);
        }
    }, [data]);

    return (
        <div className={teamDataFormStyles.team_form_wrapper}>
            <form className={teamDataFormStyles.form}
                onSubmit={handleSubmit(handleEditTeam)}>
                <div className={teamDataFormStyles.input_wrapper}>
                    <div className={teamDataFormStyles.form_label}>
                        <MdSubtitles className={teamDataFormStyles.display_icon} />
                        <label className={teamDataFormStyles.label}>
                            Name
                        </label>
                    </div>
                    <input
                        className={teamDataFormStyles.input}
                        name='name'
                        type='text'
                        autoComplete='off'
                        placeholder='Enter project name...'
                        defaultValue={team.name}
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
                <div className={teamDataFormStyles.input_wrapper}>
                    <div className={teamDataFormStyles.form_label}>
                        <MdDescription className={teamDataFormStyles.display_icon} />
                        <label className={teamDataFormStyles.label}>
                            Description
                        </label>
                    </div>
                    <TextareaAutosize
                        className={[teamDataFormStyles.input, teamDataFormStyles.textarea].join(' ')}
                        name='description'
                        autoComplete='off'
                        placeholder='Enter projects description...'
                        defaultValue={team.description}
                        {...register('description')} />
                </div>
                <button className={teamDataFormStyles.submit_button}
                    type='submit'>
                    Create Team
                </button>
            </form>
        </div>
    )
}

export default TeamDataForm;