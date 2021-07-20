import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";

const getTeamRole: MiddlewareFn<MyContext> = ({ context, args }, next) => {



    return next();
}

export default getTeamRole;