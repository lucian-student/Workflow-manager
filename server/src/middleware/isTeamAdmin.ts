import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
//import User from "../entity/User";

interface Arguments {
    team_id: number
}
const isTeamAdmin: MiddlewareFn<MyContext> = async ({ context, args }, next) => {
    const type_of_project: string | undefined = context.payload.type_of_project;

    if (!type_of_project) {
        throw new Error("Access denied! You dont have permission to perform this action!");
    }

    if (type_of_project === 'user') {
        return next();
    }

    if (type_of_project === 'team') {
        //check if admin in team
        const { team_id } = args as Arguments;
    }


    return next();
}

export default isTeamAdmin;