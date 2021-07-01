import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import jwt from 'jsonwebtoken';

interface Payload {
    user: string
}
const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
        throw new Error("Access denied! You need to be authorized to perform this action!");
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.SECRET1!);
        context.payload = { user_id: Number((payload as Payload).user) };
    } catch (err) {
        console.log(err);
        throw new Error("Access denied! You need to be authorized to perform this action!");
    }


    return next();
}


export default isAuth;