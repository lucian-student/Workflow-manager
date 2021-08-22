import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import UserTeamConnection from "../entity/UserTeamConnection";

interface Arguments {
    con_id: number
}

const isUserTeamConnectionAccessible: MiddlewareFn<MyContext> = async ({ context, args }, next) => {
    const user_id = context.payload.user_id;

    const con_id = (args as Arguments).con_id;

    const con = await UserTeamConnection.findOne({ where: { con_id } });

    if (!con) {
        throw Error('Connection doesnt exist!');
    }

    if (Number(con.user_id) !== user_id) {
        throw Error('Access denied! You dont have permission to perform this action!');
    }

    return next();
}

export default isUserTeamConnectionAccessible;