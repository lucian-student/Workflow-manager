import "dotenv/config";
import 'reflect-metadata';
import express, { Request } from 'express';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import createSchema from './createSchema';
import { createConnection } from 'typeorm';
import jwt, { Secret } from 'jsonwebtoken';
import User from "./entity/User";
import { sendRefreshToken } from "./utils/sendRefreshToken";
import generateRefreshToken from "./utils/generateRefreshToken";
import generateAccessToken from "./utils/generateAccessToken";
import cookieParser from "cookie-parser";
import cors from 'cors';

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
        context: ({ req, res }) => ({ req, res })
    });

    const app = express();
    app.use(cookieParser());
    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true
    }
    app.use(cors(corsOptions));
    app.post("/refresh_token", async (req: RequestData, res) => {
        try {

            const token = req.cookies['token'];
            if (!token) {
                return res.send({ ok: false, accessToken: "" });
            }

            let payload: any = null;
            try {
                payload = jwt.verify(token, process.env.SECRET2 as Secret);
            } catch (err) {
                console.log(err.message);
                return res.send({ ok: false, accessToken: "" });
            }

            const user = await User.findOne({ where: { user_id: Number(payload.user) } });

            if (!user) {
                return res.send({ ok: false, accessToken: "" });
            }

            if (user.tokenVersion !== payload.tokenVersion) {
                return res.send({ ok: false, accessToken: "" });
            }

            sendRefreshToken(res, generateRefreshToken(user.user_id, user.tokenVersion));

            return res.send({ ok: true, accessToken: generateAccessToken(user.user_id) });

        } catch (error) {
            console.log(error.message);
            return res.status(500).send('Server error');
        }
    });



    apollo.applyMiddleware({ app, cors: false });
    const httpServer = http.createServer(app);
    apollo.installSubscriptionHandlers(httpServer);

    httpServer.listen(PORT, () => { console.log(`server is listening on port ${PORT}/graphql`) });
}


main();

