import React from "react";
import Layout from "../components/Layout/Layout";
import Background from "../components/Layout/Background";
import loginStyles from '../pageUtils/Login/Login.module.css';
function Login() {
    return (
        <Layout>
            <div className={loginStyles.login_wrapper}>
                <Background />
            </div>
        </Layout>
    )
}


export default Login;