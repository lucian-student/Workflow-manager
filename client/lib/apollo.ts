import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    NormalizedCacheObject,
    split
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createHttpLink } from "@apollo/client/link/http";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from "@apollo/client/utilities";
//import { onError } from '@apollo/client/link/error';
import fetch from "isomorphic-unfetch";
import { isBrowser } from "./isBrowser";
import jwtDecode, { } from 'jwt-decode';
import { setAccessToken } from "../utils/accessToken";
import axios, { AxiosResponse } from "axios";
//import Router from 'next/router';

export let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
    (global as any).fetch = fetch;
}

interface Options {
    getAccessToken: () => string;
}

interface AccessToken {
    name: string;
    exp: number;
}

interface Definintion {
    kind: string;
    operation?: string;
};

function createLink(getAccessToken: () => string): ApolloLink {
    const httpLink = createHttpLink({
        uri: "http://localhost:5000/graphql",
        credentials: "include"
    });

    const wsLink = process.browser ? new WebSocketLink({ // if you instantiate in the server, the error will be thrown
        uri: `ws://localhost:5000/graphql`,
        options: {
            reconnect: true,
            connectionParams: async () => {
                const response = await axios({
                    method: 'POST',
                    withCredentials: true,
                    url: 'http://localhost:5000/refresh_token/subscribtion'
                }).catch((err) => {
                    console.log(err);
                    return { subscribtionToken: '' }
                });

                return { subscribtionToken:(response as AxiosResponse).data.subscribtionToken}
            },
        }
    }) : null;

    const link = isBrowser ? split( //only create the split in the browser
        // split based on operation type
        ({ query }) => {
            const { kind, operation }: Definintion = getMainDefinition(query);
            return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        httpLink,
    ) : httpLink;

    const authLink = setContext(async (_, { headers }) => {
        let token = getAccessToken();
        // console.log(token);

        if (token) {
            const { exp }: AccessToken = jwtDecode(token);
            if (Date.now() >= exp * 1000) {
                try {
                    const response = await axios({
                        method: 'POST',
                        withCredentials: true,
                        url: 'http://localhost:5000/refresh_token/api'
                    });

                    if (response.data.ok) {
                        setAccessToken(response.data.accessToken);
                        token = response.data.accessToken;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        //console.log(headers);
        return {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                ...headers,
            }
        };
    });


    return authLink.concat(link);
}

function create(initialState: any, { getAccessToken }: Options) {

    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        connectToDevTools: isBrowser,
        ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
        link: createLink(getAccessToken),
        cache: new InMemoryCache().restore(initialState || {})
    });
}

export default function initApollo(initialState: any, options: Options) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!isBrowser) {
        const client = create(initialState, options);

        client.onResetStore(async () => {
            client.setLink(createLink(options.getAccessToken));
        })

        return client;
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState, options);

        apolloClient.onResetStore(async () => {
            apolloClient.setLink(createLink(options.getAccessToken));
        });
    }

    return apolloClient;
}
