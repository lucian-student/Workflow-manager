import React, { Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import Layout from "../Layout/Layout";
// template for higher order components

const withoutAuth: <T extends Object>(Component: React.ComponentType<T>) => (props: any) => JSX.Element
    = <T extends Object>(Component: React.ComponentType<T>) => {
        const NotAuthComponent = (props: any) => {
            const { currentUser } = useContext(AuthContext);
            const Router = useRouter();
            useEffect(() => {
                if (currentUser) {
                    Router.push('/main');
                }
            }, [currentUser]);
            return (
                <Fragment>
                    <Layout >
                        {!currentUser && (
                            <Component {...props} />
                        )}
                    </Layout>
                </Fragment>
            )
        }

        return NotAuthComponent;
    }

export default withoutAuth;