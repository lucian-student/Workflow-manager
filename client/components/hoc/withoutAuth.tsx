import React, { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import Layout from "../Layout/Layout";
// template for higher order components

const withoutAuth: <T extends Object>(Component: React.ComponentType<T>) => (props: any) => JSX.Element
    = <T extends Object>(Component: React.ComponentType<T>) => {
        const NotAuthComponent = (props: any) => {
            const { currentUser } = useContext(AuthContext);
            const [loading, setLoading] = useState<boolean>(true);
            const Router = useRouter();
            useEffect(() => {
                if (currentUser) {
                    Router.push('/main');
                } else {
                    setLoading(false);
                }
            }, [currentUser]);
            return (
                <Fragment>
                    <Layout >
                        {!loading && (
                            <Component {...props} />
                        )}
                    </Layout>
                </Fragment>
            )
        }

        return NotAuthComponent;
    }

export default withoutAuth;