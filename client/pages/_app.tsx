import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from "@apollo/client";
import { withApollo, WithApolloProps } from "next-with-apollo";
import initApollo from "../lib/apollo";
import { getAccessToken } from '../utils/accessToken';
import '../css/global.css';



function MyApp({ pageProps, Component, apollo }: WithApolloProps<any> & AppProps) {

    return (
        <ApolloProvider client={apollo}>
                <Component {...pageProps} />
        </ApolloProvider>
    );
}



export default withApollo(({ initialState, ctx }) => {
    return initApollo(initialState, {
        getAccessToken: () => getAccessToken()
    })
})(MyApp);