import React, { useState, useEffect, useContext, Fragment } from 'react';
import RoleSelect from './RoleSelect';
import { useSendUserTeamConnectionMutation } from '../../generated/apolloComponents';
import { useForm } from 'react-hook-form';
import { MenuContext } from '../../context/menu';
import inveitFormStyles from './InveitForm/InveitForm.module.css';

interface Props {
    team_id: number
}

function InveitForm({ team_id }: Props): JSX.Element {

    const [currRole, setCurrRole] = useState<'Owner' | 'Admin' | 'Member' | 'unknown'>('Member');

    const [openSelect, setOpenSelect] = useState<boolean>(false);

    const stackingMenu = useContext(MenuContext);

    const { handleSubmit, formState: { errors }, register, reset } = useForm();

    const [sendUserTeamConnectionMutation, { error, data }] = useSendUserTeamConnectionMutation({
        onError(err) {
            console.log(err.message);
        }
    });

    function handleInveitMember(input: { username: string }) {
        if (currRole === 'unknown') {
            return;
        }

        let newRole: 1 | 2 | 3;

        switch (currRole) {
            case 'Owner':
                newRole = 1
                break;
            case 'Admin':
                newRole = 2
                break;
            case 'Member':
                newRole = 3
                break;
            default:
                return;
        }

        sendUserTeamConnectionMutation({
            variables: {
                data: {
                    username: input.username,
                    role: newRole
                },
                team_id
            }
        });

    }

    useEffect(() => {
        if (data) {
            reset();
        }
    }, [data]);

    useEffect(() => {
        if (openSelect) {
            stackingMenu.setOpen(true);
        } else {
            stackingMenu.setOpen(false);
        }
    }, [openSelect]);

    return (
        <form onSubmit={handleSubmit(handleInveitMember)}
            className={inveitFormStyles.form}>
            <div className={inveitFormStyles.input_wrapper}>
                <label className={inveitFormStyles.label}>
                    Username
                </label>
                <input
                    className={inveitFormStyles.input}
                    name='username'
                    type='text'
                    autoComplete='on'
                    placeholder='Enter your username...'
                    {...register('username', {
                        validate: {
                            min_length: (value) => { return value.trimStart().trimEnd().replace(/\s+/g, " ").length >= 3 },
                            max_length: (value) => { return value.trimStart().trimEnd().replace(/\s+/g, " ").length <= 15 }
                        }
                    })} />
                {errors.username && errors.username.type === 'min_length' && (
                    <div className='error_message'>Username has to be at least 3 characters long!</div>
                )}
                {errors.username && errors.username.type === 'max_Length' && (
                    <div className='error_message'>Username cannot be longer than 15 characters!</div>
                )}
                {errors.username && errors.username.type === 'IsUsernameAlreadyUsedConstraint' && (
                    <div className='error_message'>This username already exists!</div>
                )}
                {error && (
                    <div className='error_message'>
                        {error.message}
                    </div>
                )}
                {data && (
                    <Fragment>
                        {data.sendUserTeamConnection && (
                            <div className={inveitFormStyles.success_message}>
                                User inveited successfully!
                            </div>
                        )}
                    </Fragment>
                )}
            </div>
            <div className={inveitFormStyles.role_select_wrapper}>
                <RoleSelect setCurrRole={setCurrRole} currRole={currRole} setOpenSelect={setOpenSelect} openSelect={openSelect} />
            </div>
            <button className={inveitFormStyles.submit_button}
                type='submit'>
                Inveit User
            </button>
        </form>
    )
}

export default InveitForm;