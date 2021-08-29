import React, { createContext, useState, useEffect, Fragment, } from "react";
import User from '../interfaces/User';
import { useMeQuery } from '../generated/apolloComponents';
//import { useApolloClient } from '@apollo/client';

interface IAuthContext {
    currentUser: User | null | boolean,
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>
}

export const AuthContext = createContext<IAuthContext>({
    currentUser: null,
    setCurrentUser: null
});

interface AuxProps {
    children: JSX.Element
}


export const AuthContextProvider = ({ children }: AuxProps) => {
    const [currentUser, setCurrentUser] = useState<User | null | boolean>(false);

    //const apolloClient = useApolloClient();

    const { data, error } = useMeQuery({
        onError(err) {
            console.log(err.message);
        },
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-only'
    });

    /*useEffect(() => {
        if (currentUser) {
            if (currentUser !== true) {
                console.log('authenticated');
                // apolloClient.resetStore();
            }
        }
    }, [currentUser]);*/

    useEffect(() => {
        if (data) {
            setCurrentUser(data.me);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            setCurrentUser(null);
        }
    }, [error])

    return (
        <AuthContext.Provider value={{
            currentUser,
            setCurrentUser
        }}>
            {currentUser !== false && (
                <Fragment>
                    {children}
                </Fragment>
            )}
        </AuthContext.Provider>
    )
}