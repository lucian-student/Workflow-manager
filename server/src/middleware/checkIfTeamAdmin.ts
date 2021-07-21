import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";

const checkIfTeamAdmin: MiddlewareFn<MyContext> = ({ context, args }, next) => {

    const role = context.payload.role;

    if (role) {
        if (role > 2) {
            throw Error('Access denied! You dont have permission to perform this action!');
        }
    }

    return next();
}

export default checkIfTeamAdmin;