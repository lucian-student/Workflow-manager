import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";

const checkIfTeamOwner: MiddlewareFn<MyContext> = ({ context, args }, next) => {


    return next();
}

export default checkIfTeamOwner;