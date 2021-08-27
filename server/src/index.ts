import "dotenv/config";
import 'reflect-metadata';
import express, { Request } from 'express';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import createSchema from './createSchema';
import { createConnection } from 'typeorm';
import refreshTokens from "./utils/refreshTokens";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { Secret } from "jsonwebtoken";

const PORT = 5000 || process.env.PORT

type RequestData = Request & {
    cookies: any & {
        token: any
    }
}

async function main() {
    await createConnection();
    const schema = await createSchema();
    const apollo = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
        /* subscriptions: '/subscriptions',*/
    });

    const app = express();
    app.use(cookieParser());
    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true
    }
    app.use(cors(corsOptions));
    app.post("/refresh_token", async (req: RequestData, res) => {
        await refreshTokens(req, res);
    });

    //apollo.installSubscriptionHandlers(httpServer)
    apollo.applyMiddleware({ app, cors: false });
    const httpServer = http.createServer(app);
    //apollo.installSubscriptionHandlers(httpServer);

    // httpServer.listen(PORT, () => { console.log(`server is listening on port ${PORT}/graphql`) });

    httpServer.listen(PORT, () => {
        new SubscriptionServer({
            execute,
            subscribe,
            schema: schema,
            onConnect: (connectionParams: { accessToken: string }) => {
                console.log(connectionParams);
            }
        }, {
            server: httpServer,
            path: '/graphql',
        });

        console.log(`server is listening on port ${PORT}/graphql`)
    });
}


main();

