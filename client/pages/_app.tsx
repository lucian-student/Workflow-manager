import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from "@apollo/client";
import { withApollo, WithApolloProps } from "next-with-apollo";
import initApollo from "../lib/apollo";
import { getAccessToken, setAccessToken } from '../utils/accessToken';
import { AuthContextProvider } from '../context/auth';
import axios from 'axios';
import '../css/global.css';




function MyApp({ pageProps, Component, apollo }: WithApolloProps<any> & AppProps) {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios({
                    method: 'POST',
                    withCredentials: true,
                    url: 'http://localhost:5000/refresh_token'
                });

                if (response.data.ok) {
                    setAccessToken(response.data.accessToken);
                    //console.log(getAccessToken());
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);


    return (
        <ApolloProvider client={apollo}>
            {!loading && (
                <AuthContextProvider>
                    <Component {...pageProps} />
                </AuthContextProvider>
            )}
        </ApolloProvider>
    );
}





export default withApollo(({ initialState, ctx }) => {
    return initApollo(initialState, {
        getAccessToken: () => getAccessToken()
    })
})(MyApp);