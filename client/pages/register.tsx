import React from "react";
import Layout from "../components/Layout/Layout";
import Background from "../components/Layout/Background";
import registerStyles from '../pageUtils/Register/Register.module.css';
import { useForm } from 'react-hook-form';

function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    async function handleRegister(data) {
        console.log(data);
    }

    return (
        <Layout>
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
                                    minLength: 3
                                })} />
                        </div>
                        <button className={registerStyles.submit_button}
                            type='submit'>
                            Submit</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}


export default Register;