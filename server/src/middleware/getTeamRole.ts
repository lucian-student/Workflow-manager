import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import UserTeamConnection from '../entity/UserTeamConnection';

interface Arguments {
    team_id?: number
}

const getTeamRole: MiddlewareFn<MyContext> = async ({ context, args }, next) => {

    const user_id = context.payload.user_id;
    const { team_id } = args as Arguments;

    if (team_id) {

        const connection = await UserTeamConnection.findOne({ where: { user_id, team_id } });

        if (!connection) {
            throw Error('Access denied! You dont have permission to perform this action!');
        }

        context.payload.role = connection?.role;
    }

    return next();
}

export default getTeamRole;