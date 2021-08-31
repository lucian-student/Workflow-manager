import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import User from "../entity/User";
import generateSubscribtionToken from './generateSubscribtionToken';

type RequestData = Request & {
    cookies: any & {
        token: any
    }
}

export default async function subscribtionToken(req: RequestData, res: Response) {
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

        return res.send({ ok: true, subscribtionToken: generateSubscribtionToken(user.user_id, user.tokenVersion) });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server error');
    }
}