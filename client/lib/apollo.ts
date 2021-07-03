import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createHttpLink } from "@apollo/client/link/http";
//import { onError } from '@apollo/client/link/error';
import fetch from "isomorphic-unfetch";
import { isBrowser } from "./isBrowser";
//import Router from 'next/router';

export let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
    (global as any).fetch = fetch;
}

interface Options {
    getAccessToken: () => string;
}

function create(initialState: any, { getAccessToken }: Options) {

    const httpLink = createHttpLink({
        uri: "http://localhost:5000/graphql",
        credentials: "include"
    });

    const authLink = setContext((_, { headers }) => {
        const token = getAccessToken();
        //console.log(headers);
        return {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                ...headers,
            }
        };
    });

    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        connectToDevTools: isBrowser,
        ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
        link: authLink.concat(httpLink),
        cache: new InMemoryCache().restore(initialState || {})
    });
}

export default function initApollo(initialState: any, options: Options) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!isBrowser) {
        return create(initialState, options);
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState, options);
    }

    return apolloClient;
}