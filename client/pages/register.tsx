import React, { useContext, useEffect } from "react";
import Background from "../components/Layout/Background";
import registerStyles from '../pageUtils/Register/Register.module.css';
import { useForm } from 'react-hook-form';
import { RegisterInput, useRegisterMutation } from '../generated/apolloComponents';
import { AuthContext } from '../context/auth';
import { setAccessToken } from '../utils/accessToken';
import withoutAuth from '../components/hoc/withoutAuth';

function Register() {

    const { register, handleSubmit, formState: { errors }, watch, setError } = useForm<RegisterInput>();

    const { setCurrentUser } = useContext(AuthContext);

    const confirm_password_watch = watch('confirm_password');
    const password_watch = watch('password');

    const [registerMutation, { data, error }] = useRegisterMutation();

    async function handleRegister(input: RegisterInput) {
        await registerMutation({ variables: { data: input } }).catch((err) => {
            console.log(err.message);
        });
    }

    useEffect(() => {
        if (data) {
            setCurrentUser(data.register.user);
            setAccessToken(data.register.access_token);
        }
    }, [data]);


    useEffect(() => {
        if (error) {
            const check = error.graphQLErrors[0].extensions;
            if (!check) {
                return;
            }

            if (!check.exception) {
                return;
            }

            const serverErrors = check.exception.validationErrors;

            if (!serverErrors) {
                return;
            }

            serverErrors.forEach((serverError: any) => {
                const name: "username" | "email" | "password" | "confirm_password" = serverError.property;
                const constraints = serverError.constraints;
                for (const key in constraints) {
                    if (constraints.hasOwnProperty(key)) {
                        setError(name, { message: constraints[key], type: key });
                    }
                }
            });
        }
    }, [error]);


    return (
        <div className={registerStyles.register_wrapper}>
            <Background />
            <div className={registerStyles.form_paper}>
                <form className={registerStyles.form}
                    onSubmit={handleSubmit(handleRegister)}>
                    <div className={registerStyles.input_wrapper}>
                        <label className={registerStyles.label}>
                            Username
                        </label>
                        <input
                            className={registerStyles.input}
                            name='username'
                            type='text'
                            autoComplete='on'
                            placeholder='Enter your username...'
                            {...register('username', {
                                required: true,
                                minLength: 3,
                                maxLength: 15
                            })} />
                        {errors.username && errors.username.type === 'required' && (
                            <div className='error_message'>Username is empty!</div>
                        )}
                        {errors.username && errors.username.type === 'minLength' && (
                            <div className='error_message'>Username has to be at least 3 characters long!</div>
                        )}
                        {errors.username && errors.username.type === 'maxLength' && (
                            <div className='error_message'>Username cannot be longer than 15 characters!</div>
                        )}
                        {errors.username && errors.username.type === 'IsUsernameAlreadyUsedConstraint' && (
                            <div className='error_message'>This username already exists!</div>
                        )}
                    </div>
                    <div className={registerStyles.input_wrapper}>
                        <label className={registerStyles.label}>
                            Email
                        </label>
                        <input
                            className={registerStyles.input}
                            name='email'
                            type='email'
                            autoComplete='on'
                            placeholder='Enter your email...'
                            {...register('email', {
                                required: true
                            })} />
                        {errors.email && errors.email.type === 'required' && (
                            <div className='error_message'>Email is empty!</div>
                        )}
                        {errors.email && errors.email.type === 'IsEmailAlreadyUsedConstraint' && (
                            <div className='error_message'>This email already exists!</div>
                        )}
                    </div>
                    <div className={registerStyles.input_wrapper}>
                        <label className={registerStyles.label}>
                            Password
                        </label>
                        <input
                            className={registerStyles.input}
                            name='password'
                            type='password'
                            autoComplete='off'
                            placeholder='Enter your password...'
                            {...register('password', {
                                required: true,
                                minLength: 3
                            })} />
                        {errors.password && errors.password.type === 'required' && (
                            <div className='error_message'>Password is empty!</div>
                        )}
                        {errors.password && errors.password.type === 'minLength' && (
                            <div className='error_message'>Password has to be at least 3 characters long!</div>
                        )}
                    </div>
                    <div className={registerStyles.input_wrapper}>
                        <label className={registerStyles.label}>
                            Confirm Password
                        </label>
                        <input
                            className={registerStyles.input}
                            name='confirm_password'
                            type='password'
                            autoComplete='off'
                            placeholder='Confirm your password...'
                            {...register('confirm_password', {
                                required: true,
                                minLength: 3,
                                validate: {
                                    match: () => confirm_password_watch === password_watch
                                }
                            })} />
                        {errors.confirm_password && errors.confirm_password.type === 'required' && (
                            <div className='error_message'>Confirm Password is empty!</div>
                        )}
                        {errors.confirm_password && errors.confirm_password.type === 'minLength' && (
                            <div className='error_message'>Confirm Password has to be at least 3 characters long!</div>
                        )}
                        {errors.confirm_password && errors.confirm_password.type === 'match' && (
                            <div className='error_message'>Confirm Password and Password must match!</div>
                        )}
                    </div>
                    <button className={registerStyles.submit_button}
                        type='submit'>
                        Submit</button>
                </form>
            </div>
        </div>
    )
}


export default withoutAuth(Register);