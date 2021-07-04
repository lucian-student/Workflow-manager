import React, { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import Layout from "../Layout/Layout";

const withAuth: <T extends Object>(Component: React.ComponentType<T>) => (props: any) => JSX.Element
    = <T extends Object>(Component: React.ComponentType<T>) => {
        const AuthComponent = (props: any) => {
            const { currentUser } = useContext(AuthContext);
            const [loading, setLoading] = useState<boolean>(true);
            const Router = useRouter();
            useEffect(() => {
                if (!currentUser) {
                    Router.push('/login');
                } else {
                    setLoading(false);
                }
            }, [currentUser]);
            return (
                <Fragment>
                    <Layout>
                        {!loading && (
                            <Component {...props} />
                        )}
                    </Layout>
                </Fragment>
            )
        }

        return AuthComponent;
    }

export default withAuth;