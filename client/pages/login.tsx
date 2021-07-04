import React, { useEffect, useContext } from "react";
import Background from "../components/Layout/Background";
import loginStyles from '../pageUtils/Login/Login.module.css';
import { useForm } from 'react-hook-form';
import { useLoginMutation, LoginMutationVariables } from '../generated/apolloComponents';
import { AuthContext } from '../context/auth';
import { setAccessToken } from "../utils/accessToken";
import withoutAuth from "../components/hoc/withoutAuth";

function Login() {

    const { register, handleSubmit, formState: { errors }, setError } = useForm();

    const { setCurrentUser } = useContext(AuthContext);

    const [loginMutation, { data }] = useLoginMutation();

    async function handleLogin(data: LoginMutationVariables) {
        await loginMutation({ variables: data }).catch((err) => { console.log(err.message) });
    }

    useEffect(() => {
        if (data) {
            if (!data.login) {
                setError('email',
                    {
                        type: 'invalid',
                        message: 'Either you havenť confirmed your email, email doesnt exist or password doesnt match'
                    });

                return;
            } else {
                setCurrentUser(data.login.user);
                setAccessToken(data.login.access_token);
            }
        }
    }, [data]);

    return (
        <div className={loginStyles.login_wrapper}>
            <Background />
            <div className={loginStyles.form_paper}>
                <form className={loginStyles.form}
                    onSubmit={handleSubmit(handleLogin)}>
                    <div className={loginStyles.input_wrapper}>
                        <label className={loginStyles.label}>
                            Email
                        </label>
                        <input
                            className={loginStyles.input}
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
                    </div>
                    <div className={loginStyles.input_wrapper}>
                        <label className={loginStyles.label}>
                            Password
                        </label>
                        <input
                            className={loginStyles.input}
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
                    <button className={loginStyles.submit_button}
                        type='submit'>
                        Submit</button>
                </form>
            </div>
        </div>
    )
}


export default withoutAuth(Login);

//export default Login;