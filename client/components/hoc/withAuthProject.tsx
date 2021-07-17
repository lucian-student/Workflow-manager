import React, { Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import LaProjectPageLayoutyout from "../Layout/ProjectPageLayout";

const withAuthProject: <T extends Object>(Component: React.ComponentType<T>) => (props: any) => JSX.Element
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
                    <LaProjectPageLayoutyout>
                        {currentUser && (
                            <Component {...props} />
                        )}
                    </LaProjectPageLayoutyout>
                </Fragment>
            )
        }

        return AuthComponent;
    }

export default withAuthProject;