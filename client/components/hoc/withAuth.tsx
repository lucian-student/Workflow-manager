import React, { Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import Layout from "../Layout/Layout";

const withAuth: <T extends Object>(Component: React.ComponentType<T>) => (props: any) => JSX.Element
    = <T extends Object>(Component: React.ComponentType<T>) => {
        const AuthComponent = (props: any) => {
            const { currentUser } = useContext(AuthContext);
            const Router = useRouter();
            useEffect(() => {
                if (!currentUser) {
                    Router.push('/login');
                }
            }, [currentUser]);
            return (
                <Fragment>
                    <Layout>
                        {currentUser && (
                            <Component {...props} />
                        )}
                    </Layout>
                </Fragment>
            )
        }

        return AuthComponent;
    }

export default withAuth;