import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";

interface Arguments {
    team_id?: number,

}
const checkTypeOfProject: MiddlewareFn<MyContext> = ({ context, args }, next) => {
    const { team_id } = args as Arguments;

    if (team_id) {
        context.payload.type_of_project = 'team';
    } else {
        context.payload.type_of_project = 'user';
    }

    return next();
}

export default checkTypeOfProject;